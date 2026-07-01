package com.spring.bookMyMovies.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Movie {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String description;
	private String genre;
	private Integer duration;
	private LocalDate releaseDate;
	private String language;
	
	@OneToMany(mappedBy = "movie", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Shows> show;

}
