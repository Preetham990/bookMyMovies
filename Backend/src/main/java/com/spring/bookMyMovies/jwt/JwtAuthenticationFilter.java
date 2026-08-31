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

        // =========================================
        // 1. ALLOW CORS PREFLIGHT REQUEST
        // =========================================

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {

            filterChain.doFilter(request, response);
            return;
        }

        // =========================================
        // 2. SKIP JWT FOR LOGIN AND REGISTRATION
        // =========================================

        String path = request.getRequestURI();

        if (path.startsWith("/api/auth/")) {

            filterChain.doFilter(request, response);
            return;
        }

        // =========================================
        // 3. GET AUTHORIZATION HEADER
        // =========================================

        String authHeader =
                request.getHeader("Authorization");

        // =========================================
        // 4. NO JWT
        // =========================================

        if (authHeader == null ||
            !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        // =========================================
        // 5. EXTRACT TOKEN
        // =========================================

        String jwtToken =
                authHeader.substring(7);

        String username;

        // =========================================
        // 6. EXTRACT USERNAME
        // =========================================

        try {

            username =
                    jwtService.extractUsername(jwtToken);

        } catch (Exception e) {

            filterChain.doFilter(request, response);
            return;
        }

        // =========================================
        // 7. CHECK AUTHENTICATION
        // =========================================

        if (username != null &&
            SecurityContextHolder
                .getContext()
                .getAuthentication() == null) {

            var userDetails =
                    userRepository
                        .findByUsername(username)
                        .orElse(null);

            if (userDetails != null) {

                // =========================================
                // 8. GET USER ROLES
                // =========================================

                List<SimpleGrantedAuthority> authorities =
                        userDetails
                            .getRole()
                            .stream()
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());

                // =========================================
                // 9. CREATE AUTHENTICATION
                // =========================================

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                authorities
                        );

                // =========================================
                // 10. REQUEST DETAILS
                // =========================================

                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                // =========================================
                // 11. SET SECURITY CONTEXT
                // =========================================

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authToken);
            }
        }

        // =========================================
        // 12. CONTINUE REQUEST
        // =========================================

        filterChain.doFilter(request, response);
    }
}
