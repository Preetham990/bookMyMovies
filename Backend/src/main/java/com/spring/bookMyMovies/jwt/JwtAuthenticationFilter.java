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
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {


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

    // Allow CORS preflight
    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
        filterChain.doFilter(request, response);
        return;
    }

    // Don't process JWT for login/register APIs
    String path = request.getRequestURI();

    if (path.startsWith("/api/auth/")) {
        filterChain.doFilter(request, response);
        return;
    }

    // Your existing JWT code below...


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {


        // =====================================================
        // 1. ALLOW CORS PREFLIGHT REQUEST
        // =====================================================

        /*
         * Browser sends OPTIONS request before POST/PUT/DELETE
         * when making a cross-origin request.
         *
         * We must NOT try to process JWT for OPTIONS.
         */

        if ("OPTIONS".equalsIgnoreCase(
                request.getMethod())) {

            filterChain.doFilter(
                request,
                response
            );

            return;
        }


        // =====================================================
        // 2. GET AUTHORIZATION HEADER
        // =====================================================

        final String authHeader =
                request.getHeader("Authorization");


        // =====================================================
        // 3. CHECK JWT HEADER
        // =====================================================

        if (authHeader == null ||
            !authHeader.startsWith("Bearer ")) {

            /*
             * No JWT.
             *
             * Continue request.
             *
             * Public APIs such as registration/login
             * can continue normally.
             */

            filterChain.doFilter(
                request,
                response
            );

            return;
        }


        // =====================================================
        // 4. EXTRACT JWT
        // =====================================================

        final String jwtToken =
                authHeader.substring(7);


        // =====================================================
        // 5. EXTRACT USERNAME
        // =====================================================

        final String username;

        try {

            username =
                jwtService.extractUsername(
                    jwtToken
                );

        } catch (Exception e) {

            /*
             * Invalid JWT.
             *
             * Don't crash the server.
             */

            filterChain.doFilter(
                request,
                response
            );

            return;
        }


        // =====================================================
        // 6. CHECK USERNAME
        // =====================================================

        if (username != null &&
            SecurityContextHolder
                .getContext()
                .getAuthentication() == null) {


            // =================================================
            // 7. FIND USER
            // =================================================

            var userDetails =
                    userRepository
                        .findByUsername(username)
                        .orElse(null);


            if (userDetails != null) {


                // =============================================
                // 8. GET USER ROLE
                // =============================================

                List<SimpleGrantedAuthority> authorities =
                        userDetails
                            .getRole()
                            .stream()
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());


                // =============================================
                // 9. CREATE AUTHENTICATION TOKEN
                // =============================================

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            authorities
                        );


                // =============================================
                // 10. SET REQUEST DETAILS
                // =============================================

                authToken.setDetails(
                    new WebAuthenticationDetailsSource()
                        .buildDetails(request)
                );


                // =============================================
                // 11. SET SECURITY CONTEXT
                // =============================================

                SecurityContextHolder
                    .getContext()
                    .setAuthentication(
                        authToken
                    );
            }
        }


        // =====================================================
        // 12. CONTINUE REQUEST
        // =====================================================

        filterChain.doFilter(
            request,
            response
        );
    }
}
