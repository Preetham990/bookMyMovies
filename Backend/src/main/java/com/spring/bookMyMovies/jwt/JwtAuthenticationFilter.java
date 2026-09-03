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
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Allow CORS preflight request
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Do NOT process JWT for authentication endpoints
        String path = request.getServletPath();

        if (path.startsWith("/api/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");

        // No JWT → continue normally
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {

            String jwtToken = authHeader.substring(7);

            String username = jwtService.extractUsername(jwtToken);

            if (username != null
                    && SecurityContextHolder.getContext().getAuthentication() == null) {

                var userDetails = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

if (jwtService.isTokenValid(jwtToken, userDetails)) {

    List<SimpleGrantedAuthority> authorities =
            userDetails.getRole()
                    .stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

    UsernamePasswordAuthenticationToken authToken =
            new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    authorities
            );

    authToken.setDetails(
            new WebAuthenticationDetailsSource()
                    .buildDetails(request)
    );

    SecurityContextHolder
            .getContext()
            .setAuthentication(authToken);
}

                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authToken);
            }

        }catch (Exception e) {
    e.printStackTrace();
    SecurityContextHolder.clearContext();
}

        filterChain.doFilter(request, response);
    }
}
