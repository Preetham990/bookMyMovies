package com.spring.bookMyMovies.DTO;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ShowsDTO {
	 private LocalDateTime showTime;
	 private double price;
	 private Long movieId;
	 private Long theatreId;

}
