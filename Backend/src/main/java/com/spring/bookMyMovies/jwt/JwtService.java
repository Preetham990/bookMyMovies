package com.spring.bookMyMovies.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.spring.bookMyMovies.Entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	
	@Value("${jwt.secret}")
	private String secretKey;
	
	@Value("${jwt.expiration}")
	private Long jwtExpiration;

	public String extractUsername(String jwtToken) {
		
		return extractClaim(jwtToken, Claims::getSubject) ;
	}

	private <T> T extractClaim(String jwtToken, Function<Claims, T> claimResolver) {
		
		final Claims claims=extractAllClaims(jwtToken);
		
		return claimResolver.apply(claims);
	}

	private Claims extractAllClaims(String jwtToken) {
		
		return Jwts.parser()
				   .verifyWith(getSignInKey())
				   .build()
				   .parseSignedClaims(jwtToken)
				   .getPayload();
	}

	private SecretKey getSignInKey() {
		
		return Keys.hmacShaKeyFor(secretKey.getBytes());
	}

	public String generateToken(UserDetails userDetails) {
		
		return generateToken(new HashMap<>(),userDetails);
	}

	public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
		// TODO Auto-generated method stub
		return Jwts.builder()
				.claims(extraClaims)
				.subject(userDetails.getUsername())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + jwtExpiration))
				.signWith(getSignInKey())
				.compact();
	}
	
	public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
		final String username=extractUsername(jwtToken);
		
		return (userDetails.getUsername().equals(username) && !isExpired(jwtToken));
		
	}

	private boolean isExpired(String jwtToken) {
		
		return extractExpiration(jwtToken).before(new Date());
	}

	private Date extractExpiration(String jwtToken) {


		return extractClaim(jwtToken, Claims::getExpiration);
	}
	
	
	

}
