package com.spring.bookMyMovies.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.management.RuntimeErrorException;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.bookMyMovies.DTO.BookingDTO;
import com.spring.bookMyMovies.Entity.Booking;
import com.spring.bookMyMovies.Entity.BookingStatus;
import com.spring.bookMyMovies.Entity.Shows;
import com.spring.bookMyMovies.Entity.User;
import com.spring.bookMyMovies.Repository.BookingRepository;
import com.spring.bookMyMovies.Repository.ShowsRepository;
import com.spring.bookMyMovies.Repository.UserRepository;

@Service
public class BookingService {
	
	@Autowired
	private BookingRepository bookingRepository;
	@Autowired
	private ShowsRepository showsRepository;
	@Autowired
	private UserRepository userRepository;
	

	public Booking  createBooking(BookingDTO bookingDTO) {
	
		Shows shows=showsRepository.findById(bookingDTO.getShowId())
				.orElseThrow(()-> new RuntimeException("Show not found"));
		
		if(!isSeatAvailable(shows.getId(),bookingDTO.getNumberOfSeat())) {
			
			throw new RuntimeException("Not enough seats are available");
			
		}
		
		if(bookingDTO.getSeatNumber().size() != bookingDTO.getNumberOfSeat()) {
			throw new RuntimeException("Seat number and Numbers of seats mush be equal");
		}
		
		validateDuplicateSeat(shows.getId(), bookingDTO.getSeatNumber());
		
		User user = userRepository.findById(bookingDTO.getUserId())
		        .orElseThrow(() -> new RuntimeException("User not found"));
		
		
		Booking booking=new Booking();
		booking.setUser(user);
		booking.setShows(shows);
		booking.setNumberOfSeat(bookingDTO.getNumberOfSeat());
		booking.setSeatNumber(bookingDTO.getSeatNumber());
		booking.setPrice(calculateTotalAmount(shows.getPrice(),bookingDTO.getNumberOfSeat()));
		booking.setBookingTime(LocalDateTime.now());
		booking.setBookingStatus(BookingStatus.PENDING);
		
		return bookingRepository.save(booking);
		
	}
	public List<Booking> getAllBookings() {
	    return bookingRepository.findAll();
	}
	
	public List<String> getBookedSeats(Long showId) {

	    List<Booking> bookings = bookingRepository.findAll();

	    return bookings.stream()
	            .filter(b -> b.getShows().getId().equals(showId))
	            .filter(b -> b.getBookingStatus() != BookingStatus.CANCELLED)
	            .flatMap(b -> b.getSeatNumber().stream())
	            .toList();
	}
	
	public List<Booking> getUserBooking(Long userId){
		return bookingRepository.findByUserId(userId);
	}
	
	public List<Booking> getShowsBooking(Long showsId){
		return bookingRepository.findByShowsId(showsId);
	}
	
	public Booking confirmBooking(Long bookingId) {
		
		Booking booking=bookingRepository.findById(bookingId).orElseThrow(()-> new RuntimeException("No booking found"));
		
		if(booking.getBookingStatus()!=BookingStatus.PENDING) {
			throw new RuntimeException("booking status is not pending");
		}
		booking.setBookingStatus(BookingStatus.CONFIRMED);
		return bookingRepository.save(booking);
	}
	
	public Booking cancelBooking(Long bookingId) {
		Booking booking=bookingRepository.findById(bookingId).orElseThrow(()-> new RuntimeException("No booking found"));
		
		validateCancellation(booking);
		booking.setBookingStatus(BookingStatus.CANCELLED);
		return bookingRepository.save(booking);
	}
	
	
	
	public void validateCancellation(Booking booking) {
		LocalDateTime showsTime=booking.getShows().getShowTime();
		LocalDateTime deadlineTime=showsTime.minusHours(2);
		
		if(LocalDateTime.now().isAfter(deadlineTime)) {
			throw new RuntimeException("can't cancel the booking");
		}
		
		if(booking.getBookingStatus()==BookingStatus.CANCELLED) {
			throw new RuntimeException("Booking already canceled");
		}
	}
	
	

	public double calculateTotalAmount(double price, Integer numberOfSeat) {
		
		return price*numberOfSeat;
	}

	public boolean isSeatAvailable(Long showsId, Integer numberOfSeat) {
		
		Shows shows=showsRepository.findById(showsId)
				.orElseThrow(()-> new RuntimeException("Show not found"));
		
		int bookedSeats=shows.getBookings().stream()
				.filter(booking -> booking.getBookingStatus()!= BookingStatus.CANCELLED)
				.mapToInt(Booking :: getNumberOfSeat)
				.sum();
		
		return (shows.getTheatre().getTheatreCapacity()- bookedSeats)>= numberOfSeat;
	}
	
	private void validateDuplicateSeat(Long showId, List<String> seatNumbers) {

	    List<Booking> bookings = bookingRepository.findAll();

	    for (Booking booking : bookings) {

	        // Ignore cancelled bookings
	        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
	            continue;
	        }

	        // Check only same show
	        if (!booking.getShows().getId().equals(showId)) {
	            continue;
	        }

	        for (String bookedSeat : booking.getSeatNumber()) {

	            if (seatNumbers.contains(bookedSeat)) {
	                throw new RuntimeException(
	                    "Seat " + bookedSeat + " is already booked"
	                );
	            }
	        }
	    }
	}

}
