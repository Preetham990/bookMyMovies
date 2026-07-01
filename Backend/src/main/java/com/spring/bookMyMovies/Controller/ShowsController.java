package com.spring.bookMyMovies.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bookMyMovies.DTO.ShowsDTO;
import com.spring.bookMyMovies.Entity.Shows;
import com.spring.bookMyMovies.Service.ShowsService;

@RestController
@RequestMapping("/api/shows")
public class ShowsController {
	
	@Autowired
	private ShowsService showsService;
	
	@PostMapping("/createshows")
	public ResponseEntity<Shows> createShows(@RequestBody ShowsDTO showsDTO){
		return ResponseEntity.ok(showsService.createShows(showsDTO));
	}
	
	@GetMapping("/getallshows")
	public ResponseEntity<List<Shows>> getAllShows(){
		return ResponseEntity.ok(showsService.getAllShows());
	}
	
	@GetMapping("/getshowsbymovie/{id}")
	public ResponseEntity<List<Shows>> getShowsByMovies(@PathVariable Long id ){
		return ResponseEntity.ok(showsService.getShowsByMovies(id));
	}
	
	@GetMapping("/getshowsbytheatre/{id}")
	public ResponseEntity<List<Shows>> getShowsByTheatre(@PathVariable Long id ){
		return ResponseEntity.ok(showsService.getShowsByTheatre(id));
	}
	
	@PutMapping("/updateshows/{id}")
	public ResponseEntity<Shows> updateShows(@PathVariable Long id,@RequestBody ShowsDTO showsDTO){
		return ResponseEntity.ok(showsService.updateShows(id,showsDTO));
	}
	
	@DeleteMapping("/deleteshows/{id}")
	public ResponseEntity<Void> deleteShows(@PathVariable Long id){
		showsService.deleteShows(id);
		return ResponseEntity.ok().build();
	}
	
	
	
	
	
	
	
	
	
	

}
