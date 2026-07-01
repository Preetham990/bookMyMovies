package com.spring.bookMyMovies.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.bookMyMovies.Entity.Theatre;

public interface TheatreRepository extends JpaRepository<Theatre, Long>{

	Optional<List<Theatre>>	findByTheatreLocation(String theatreLocation);
	
		

}
