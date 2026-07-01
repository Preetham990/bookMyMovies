package com.spring.bookMyMovies.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDTO {
	
	private String jwtToken;
	private String username;
	private String role;

}
