package com.example.findr.controllers;


import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.findr.dto.UserRequestDTO;
import com.example.findr.dto.UserResponseDTO;
import com.example.findr.model.User;
import com.example.findr.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserRequestDTO userDto) {
        User user = new User();
        user.setName(userDto.name());
        user.setMatriculationNo(userDto.matriculationNo());
        user.setTelephoneNo(userDto.telephoneNo());
        user.setEmail(userDto.email());
        user.setPassword(userDto.password());
        
        UserResponseDTO response = convertToDTO(userService.createUser(user));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/test")
    public Map<String, String> test() {
        return Map.of("status", "working");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == principal.id")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    private UserResponseDTO convertToDTO(User user) {
        return new UserResponseDTO(
                    user.getId(),
                    user.getName(),
                    user.getMatriculationNo(),
                    user.getTelephoneNo(),
                    user.getEmail()
                );
    }
}
