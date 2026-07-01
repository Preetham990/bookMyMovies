package com.spring.bookMyMovies.Service;

import java.util.List;
import java.util.Optional;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.bookMyMovies.DTO.ShowsDTO;
import com.spring.bookMyMovies.Entity.Booking;
import com.spring.bookMyMovies.Entity.Movie;
import com.spring.bookMyMovies.Entity.Shows;
import com.spring.bookMyMovies.Entity.Theatre;
import com.spring.bookMyMovies.Repository.MovieRepository;
import com.spring.bookMyMovies.Repository.ShowsRepository;
import com.spring.bookMyMovies.Repository.TheatreRepository;

@Service
public class ShowsService {
	
	@Autowired
	private ShowsRepository showsRepository;
	@Autowired
	private MovieRepository movieRepository;
	@Autowired
	private TheatreRepository theatreRepository;
	
	public Shows createShows(ShowsDTO showsDTO) {
		
		Movie movie = movieRepository.findById(showsDTO.getMovieId())
				.orElseThrow(()-> new RuntimeException("No Movie Found for id "+showsDTO.getMovieId()));
		
		Theatre theatre=theatreRepository.findById(showsDTO.getTheatreId())
				.orElseThrow(()-> new RuntimeException("No Theatre Found for id "+showsDTO.getTheatreId()));
		
		Shows shows=new Shows();
		shows.setShowTime(showsDTO.getShowTime());
		shows.setPrice(showsDTO.getPrice());
		shows.setMovie(movie);
		shows.setTheatre(theatre);
		
		return showsRepository.save(shows);
	}
	
	public List<Shows> getAllShows(){
		return showsRepository.findAll();
	}
	
	public List<Shows> getShowsByMovies(Long movieid){
		Optional<List<Shows>> showsListBox=showsRepository.findByMovieId(movieid);
		
		if(showsListBox.isPresent()) {
			return showsListBox.get();
		}
		else throw new RuntimeException("No Shows available fo the movie ");
	}
	
	public List<Shows> getShowsByTheatre(Long theatreid){
		Optional<List<Shows>> showsListBox=showsRepository.findByTheatreId(theatreid);
		
		if(showsListBox.isPresent()) {
			return showsListBox.get();
		}
		else throw new RuntimeException("No Shows available fo the Theatre ");

	}
	
	public Shows updateShows(Long id ,ShowsDTO showsDTO) {
		
		Shows shows=showsRepository.findById(id).orElseThrow(()-> new RuntimeException("No Shows for the id "+id));
		
		Movie movie = movieRepository.findById(showsDTO.getMovieId())
				.orElseThrow(()-> new RuntimeException("No Movie Found for id "+showsDTO.getMovieId()));
		
		Theatre theatre=theatreRepository.findById(showsDTO.getTheatreId())
				.orElseThrow(()-> new RuntimeException("No Theatre Found for id "+showsDTO.getTheatreId()));
		
		shows.setShowTime(showsDTO.getShowTime());
		shows.setPrice(showsDTO.getPrice());
		shows.setMovie(movie);
		shows.setTheatre(theatre);
		return showsRepository.save(shows);
	}
	
	public void deleteShows(Long id) {
		
		if(!showsRepository.existsById(id)) {
			throw new RuntimeException(" No Shows available for the id "+id);
		}
		
		List<Booking> booking=showsRepository.findById(id).get().getBookings();
		if(!booking.isEmpty()) {
			throw new RuntimeException("Can't delete the Show existing booking");
		}
		else showsRepository.deleteById(id);
	}

	
	}


