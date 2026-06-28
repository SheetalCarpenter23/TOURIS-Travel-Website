package com.travel.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Web Security Configuration
 * Configures security settings for the application
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeRequests()
                // Public endpoints
                .antMatchers("/", "/**/*.html", "/**/*.css", "/**/*.js", "/**/*.jsx", "/**/*.json", "/**/*.png", "/**/*.jpg", "/**/*.svg", "/**/*.ico").permitAll()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/destinations").permitAll()
                .antMatchers("/api/destinations/**").permitAll()
                .antMatchers("/api/contact").permitAll()
                // Protected endpoints (require authentication)
                .antMatchers("/api/bookings/**").authenticated()
                // Admin endpoints (should check for ADMIN role in production)
                .antMatchers("/api/destinations").hasRole("ADMIN")
                .antMatchers("/api/contact").hasRole("ADMIN")
                .anyRequest().permitAll() // For now, allow all - implement proper security in production
            .and()
            .headers().frameOptions().sameOrigin();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(false);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
} 