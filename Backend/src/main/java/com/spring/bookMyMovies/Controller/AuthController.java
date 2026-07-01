package com.spring.bookMyMovies.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.bookMyMovies.DTO.LoginRequestDTO;
import com.spring.bookMyMovies.DTO.LoginResponseDTO;
import com.spring.bookMyMovies.DTO.RegisterRequestDTO;
import com.spring.bookMyMovies.Entity.User;
import com.spring.bookMyMovies.Service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationService authenticationService;
	
	
	@PostMapping("/registernormaluser")
	public ResponseEntity<User> registerNormalUser(@RequestBody RegisterRequestDTO registerRequestDTO){
		
		return ResponseEntity.ok(authenticationService.registerNormalUser(registerRequestDTO));
		
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO){
		
		return ResponseEntity.ok(authenticationService.login(loginRequestDTO));
	}
	
	
	
	
	
	
	
	
	

}
