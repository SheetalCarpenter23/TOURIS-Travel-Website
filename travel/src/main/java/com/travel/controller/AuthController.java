package com.travel.controller;

import com.travel.dto.AuthRequest;
import com.travel.dto.AuthResponse;
import com.travel.model.User;
import com.travel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Controller for Authentication endpoints
 * Handles user registration and login
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Register a new user
     * @param authRequest Registration request with name, email, and password
     * @return AuthResponse with token and user details
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody AuthRequest authRequest) {
        // Check if email already exists
        if (userService.existsByEmail(authRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Email already exists");
        }

        // Create new user
        User user = new User();
        user.setName(authRequest.getName());
        user.setEmail(authRequest.getEmail());
        user.setPassword(passwordEncoder.encode(authRequest.getPassword()));

        User savedUser = userService.save(user);

        // Generate response
        AuthResponse response = new AuthResponse(
                generateToken(savedUser),
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole().toString()
        );

        return ResponseEntity.ok(response);
    }

    /**
     * Login user
     * @param authRequest Login request with email and password
     * @return AuthResponse with token and user details
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody AuthRequest authRequest) {
        User user = userService.findByEmail(authRequest.getEmail());
        
        if (user == null || !passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        // Generate response
        AuthResponse response = new AuthResponse(
                generateToken(user),
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().toString()
        );

        return ResponseEntity.ok(response);
    }

    /**
     * Simple token generation (for demo purposes)
     * In production, use JWT tokens
     */
    private String generateToken(User user) {
        return "user_" + user.getId() + "_" + System.currentTimeMillis();
    }
} 