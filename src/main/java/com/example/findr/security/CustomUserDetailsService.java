package com.example.findr.security;

import com.example.findr.exception.ResourceNotFound;
import com.example.findr.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) {
        return userRepo.findByEmail(email)
                .map(UserPrincipal::create)
                .orElseThrow(() -> new ResourceNotFound("User not found with email: " + email));
    }

    public UserDetails loadUserById(String id) {
        return userRepo.findById(id)
                .map(UserPrincipal::create)
                .orElseThrow(() -> new ResourceNotFound("User not found with id: " + id));
    }
}
