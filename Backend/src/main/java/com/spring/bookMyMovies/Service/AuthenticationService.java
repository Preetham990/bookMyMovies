package com.spring.bookMyMovies.Service;

import java.util.HashSet;
import java.util.Set;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.bookMyMovies.DTO.LoginRequestDTO;
import com.spring.bookMyMovies.DTO.LoginResponseDTO;
import com.spring.bookMyMovies.DTO.RegisterRequestDTO;
import com.spring.bookMyMovies.Entity.User;
import com.spring.bookMyMovies.Repository.UserRepository;
import com.spring.bookMyMovies.jwt.JwtService;

@Service
public class AuthenticationService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtService jwtService;

	public User registerNormalUser(RegisterRequestDTO registerRequestDTO) {
		
		if(userRepository.findByUsername(registerRequestDTO.getUsername()).isPresent()) {
			throw new RuntimeException("User already registred");
		}
		
		Set<String> role=new HashSet<String>();
		role.add("ROLE_USER");
		
		User user=new User();
		user.setUsername(registerRequestDTO.getUsername());
		user.setEmail(registerRequestDTO.getEmail());
		user.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
		user.setRole(role);
		
		return userRepository.save(user);
	}
	
	
	
	
	public User registerAdminUser(RegisterRequestDTO registerRequestDTO) {
		
		if(userRepository.findByUsername(registerRequestDTO.getUsername()).isPresent()) {
			throw new RuntimeException("User already registred");
		}
		
		Set<String> role=new HashSet<String>();
		role.add("ROLE_ADMIN");
		role.add("ROLE_USER");
		
		User user=new User();
		user.setUsername(registerRequestDTO.getUsername());
		user.setEmail(registerRequestDTO.getEmail());
		user.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
		user.setRole(role);
		
		return userRepository.save(user);
	}
	
	
	public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
		
		User user=userRepository.findByUsername(loginRequestDTO.getUsername())
				.orElseThrow(()-> new RuntimeException("User not found"));
		
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword())
				);
		
		String token=jwtService.generateToken(user);
		
		return LoginResponseDTO.builder().jwtToken(token)
										 .username(user.getUsername())
										 .build();
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	

}
