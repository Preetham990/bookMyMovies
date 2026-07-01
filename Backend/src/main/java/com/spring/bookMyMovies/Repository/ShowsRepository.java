package com.spring.bookMyMovies.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.bookMyMovies.Entity.Shows;

public interface ShowsRepository extends JpaRepository<Shows, Long>{

	Optional<List<Shows>> findByMovieId(Long movieid);

	Optional<List<Shows>> findByTheatreId(Long theatreid);
	
	

}
