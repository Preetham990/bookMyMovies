package com.spring.bookMyMovies.Entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Shows {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 private LocalDateTime showTime;
	 private double price;
	 
	 @ManyToOne(fetch=FetchType.EAGER)
	 @JoinColumn(name="movie_id",nullable = false)
	 private Movie movie;
	 
	 @ManyToOne(fetch=FetchType.EAGER)
	 @JoinColumn(name="theatre_id",nullable = false)
	 private Theatre theatre;
	 
	 @OneToMany(mappedBy = "shows",fetch= FetchType.LAZY)
	 @JsonIgnore
	private List<Booking> bookings;
	 
	
}
