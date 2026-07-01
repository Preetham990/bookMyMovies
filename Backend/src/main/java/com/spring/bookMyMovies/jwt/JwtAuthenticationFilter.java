package com.spring.bookMyMovies.jwt;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.spring.bookMyMovies.Repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtService jwtService;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
	
		final String authHeader=request.getHeader("Authorization");
		final String jwtToken;
		final String username;
		
		if(authHeader==null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		jwtToken=authHeader.substring(7);
		username=jwtService.extractUsername(jwtToken);
		
		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			
			var userdetails=userRepository.findByUsername(username)
										  .orElseThrow(()-> new RuntimeException("User not found"));
			
			List<SimpleGrantedAuthority> authorities=userdetails.getRole().stream()
														.map(SimpleGrantedAuthority::new)
														.collect(Collectors.toList());
			
			UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(username,null, authorities);
			
			
			authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			
			SecurityContextHolder.getContext().setAuthentication(authToken);
		}
		filterChain.doFilter(request, response);
		
	}
	
	
}
	


