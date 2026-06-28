package com.travel.service;

import com.travel.model.User;
import com.travel.model.UserRole;
import com.travel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for User operations
 * Handles business logic for user management
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        if (user.getRole() == null) {
            user.setRole(UserRole.USER);
        }
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email) != null;
    }
} 