package com.example.findr.dto;

public record UserResponseDTO(
        String id,
        String name,
        Integer matriculationNo,
        String telephoneNo,
        String email
) {}