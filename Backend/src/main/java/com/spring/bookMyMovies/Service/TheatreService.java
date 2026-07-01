package com.spring.bookMyMovies.Service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.spring.bookMyMovies.DTO.TheatreDTO;
import com.spring.bookMyMovies.Entity.Theatre;
import com.spring.bookMyMovies.Repository.TheatreRepository;

@Service
public class TheatreService {
	
	@Autowired
	private TheatreRepository theatreRepository;
	
	@PostMapping("/addtheatre")
	public Theatre addTheatre(TheatreDTO theatreDTO) {
		Theatre theatre=new Theatre();
		theatre.setTheatreName(theatreDTO.getTheatreName());
		theatre.setTheatreLocation(theatreDTO.getTheatreLocation());
		theatre.setTheatreCapacity(theatreDTO.getTheatreCapacity());
		theatre.setTheatreScreenType(theatreDTO.getTheatreScreenType());
		
		return theatreRepository.save(theatre);
	}

	@GetMapping("/gettheatrebylocation")
	public List<Theatre> getTheatreByLocation(String location){
		Optional<List<Theatre>> listOfTheatreBox =theatreRepository.findByTheatreLocation(location);
		if(listOfTheatreBox.isPresent()) {
			return listOfTheatreBox.get();
		}
		else throw new RuntimeException("No Theatre found for location "+location);
	}

	@PutMapping("/updatetheatre/{id}")
	public Theatre updateTheatre(Long id, TheatreDTO theatreDTO) {
		Theatre theatre=theatreRepository.findById(id).orElseThrow(()->new RuntimeException("No Theatre found for id "+id));
		theatre.setTheatreName(theatreDTO.getTheatreName());
		theatre.setTheatreLocation(theatreDTO.getTheatreLocation());
		theatre.setTheatreCapacity(theatreDTO.getTheatreCapacity());
		theatre.setTheatreScreenType(theatreDTO.getTheatreScreenType());
		return theatreRepository.save(theatre);
	}
	
	@DeleteMapping("/deletetheatre/{id}")
	public void deleteTheatre(Long id) {
		theatreRepository.deleteById(id);
	}
	
	
	
	
	
}
