package com.spring.bookMyMovies.Entity;

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
public class Theatre {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String theatreName;
	private String theatreLocation;
	private Integer theatreCapacity;
	private String theatreScreenType;
	
	@OneToMany(mappedBy = "theatre", fetch=FetchType.LAZY)
	@JsonIgnore
	private List<Shows> shows;

}
