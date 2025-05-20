package com.example.findr.services;

import com.example.findr.dto.UserResponseDTO;
import com.example.findr.exception.ResourceNotFound;
import com.example.findr.model.User;
import com.example.findr.repositories.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Autowired
    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public User createUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new IllegalStateException("User with email " + user.getEmail() + " already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public void deleteUser(String id) {
        if (!userRepo.existsById(id)) {
            throw new ResourceNotFound("User not found");
        }
        userRepo.deleteById(id);
    }

    public User getUserById(String id) {
        return userRepo.findById(id).
                orElseThrow(() -> new ResourceNotFound("User with id: " + id + "not found"));
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).
                orElseThrow(() -> new ResourceNotFound("User with email: " + email + "not found"));
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()){
            return null;
        }

        String email = authentication.getName();
        return getUserByEmail(email);
    }
}
