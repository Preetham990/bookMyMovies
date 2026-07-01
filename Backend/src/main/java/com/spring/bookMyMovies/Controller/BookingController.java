package com.spring.bookMyMovies.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bookMyMovies.DTO.BookingDTO;
import com.spring.bookMyMovies.Entity.Booking;
import com.spring.bookMyMovies.Service.BookingService;


@RestController
@RequestMapping("/api/booking")
public class BookingController {

	@Autowired
	private BookingService bookingService;
	
	@PostMapping("/createbooking")
	public ResponseEntity<Booking> createBooking(@RequestBody BookingDTO bookingDTO){
		return ResponseEntity.ok(bookingService.createBooking(bookingDTO));
	}
	
	@GetMapping("/getuserbooking/{id}")
	public ResponseEntity<List<Booking>> getUserBooking(@PathVariable Long id){
		
		return ResponseEntity.ok(bookingService.getUserBooking(id));
	}
	
	@GetMapping("/getshowbooking/{id}")
	public ResponseEntity<List<Booking>> getShowsBooking(@PathVariable Long id){
		
		return ResponseEntity.ok(bookingService.getShowsBooking(id));
	}
	
	@PutMapping("{id}/confirm")
	public ResponseEntity<Booking> confirmBooking(@PathVariable Long id){
		return ResponseEntity.ok(bookingService.confirmBooking(id));
	}
	
	@PutMapping("{id}/cancel")
	public ResponseEntity<Booking> cancelBooking(@PathVariable Long id){
		return ResponseEntity.ok(bookingService.cancelBooking(id));
	}
	
	@GetMapping("/getallbookings")
	public List<Booking> getAllBookings() {
	    return bookingService.getAllBookings();
	}
	
	@GetMapping("/bookedseats/{showId}")
	public List<String> getBookedSeats(@PathVariable Long showId) {
	    return bookingService.getBookedSeats(showId);
	}
	
//	@GetMapping("/getbookingbystatus/{bookingStatus}")
//	public ResponseEntity<List<Booking>> getBookingByStatus(@PathVariable Long id){
//		
//		return ResponseEntity.ok(bookingService.getBookingByStatus(id));
//	}
	
}
