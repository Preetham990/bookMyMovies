package com.spring.bookMyMovies.DTO;

import java.time.LocalDateTime;
import java.util.List;

import com.spring.bookMyMovies.Entity.BookingStatus;

import lombok.Data;

@Data
public class BookingDTO {

	private Integer numberOfSeat;
	private LocalDateTime bookingTime;
	private double price;
	private BookingStatus bookingStatus;
	private List<String> seatNumber; 
	private Long userId;
	private Long showId;
}
