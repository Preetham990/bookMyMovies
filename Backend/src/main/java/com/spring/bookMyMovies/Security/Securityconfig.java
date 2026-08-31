package com.spring.bookMyMovies.Security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.spring.bookMyMovies.Service.CustomUserdetailsService;
import com.spring.bookMyMovies.jwt.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class Securityconfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private CustomUserdetailsService customUserdetailsService;

    // ==============================
    // SECURITY FILTER CHAIN
    // ==============================

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http

            // Disable CSRF because we are using JWT
            .csrf(csrf -> csrf.disable())

            // Enable CORS
            .cors(Customizer.withDefaults())

            // Authorization rules
            .authorizeHttpRequests(auth -> auth

                // IMPORTANT:
                // Allow browser CORS preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ==============================
                // AUTH APIs
                // ==============================

                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()

                // ==============================
                // PUBLIC MOVIE APIs
                // ==============================

                .requestMatchers(
                    "/api/movies/getallmovies"
                ).permitAll()

                // ==============================
                // PUBLIC SHOW APIs
                // ==============================

                .requestMatchers(
                    "/api/shows/getallshows"
                ).permitAll()

                .requestMatchers(
                    "/api/shows/getshowsbymovie/**"
                ).permitAll()

                // ==============================
                // PUBLIC THEATRE APIs
                // ==============================

                .requestMatchers(
                    "/api/theatre/gettheatrebylocation"
                ).permitAll()

                // ==============================
                // ADMIN REGISTRATION
                // ==============================

                .requestMatchers(
                    "/admin/registeradminuser"
                ).permitAll()

                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            // ==============================
            // SESSION MANAGEMENT
            // ==============================

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // ==============================
            // AUTHENTICATION PROVIDER
            // ==============================

            .authenticationProvider(
                authenticationProvider()
            )

            // ==============================
            // JWT FILTER
            // ==============================

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }


    // ==============================
    // AUTHENTICATION PROVIDER
    // ==============================

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
            new DaoAuthenticationProvider(
                userDetailsService()
            );

        provider.setPasswordEncoder(
            passwordEncoder()
        );

        return provider;
    }


    // ==============================
    // PASSWORD ENCODER
    // ==============================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    // ==============================
    // USER DETAILS SERVICE
    // ==============================

    @Bean
    public UserDetailsService userDetailsService() {

        return customUserdetailsService;
    }


    // ==============================
    // AUTHENTICATION MANAGER
    // ==============================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {

        return config.getAuthenticationManager();
    }


    // ==============================
    // CORS CONFIGURATION
    // ==============================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
            new CorsConfiguration();

        // ==============================
        // ALLOWED FRONTEND URLS
        // ==============================

        configuration.setAllowedOrigins(
            List.of(
                "http://localhost:5173",
                "https://bookmovieshere.netlify.app"
            )
        );


        // ==============================
        // ALLOWED HTTP METHODS
        // ==============================

        configuration.setAllowedMethods(
            List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "PATCH",
                "OPTIONS"
            )
        );


        // ==============================
        // ALLOWED HEADERS
        // ==============================

        configuration.setAllowedHeaders(
            List.of(
                "Authorization",
                "Content-Type",
                "Accept",
                "Origin",
                "X-Requested-With"
            )
        );


        // ==============================
        // ALLOW CREDENTIALS
        // ==============================

        configuration.setAllowCredentials(true);


        // ==============================
        // REGISTER CORS
        // ==============================

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            configuration
        );

        return source;
    }
}
