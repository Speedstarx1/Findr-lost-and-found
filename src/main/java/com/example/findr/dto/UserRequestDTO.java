package com.example.findr.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(
        @NotBlank String name,
        @NotNull Integer matriculationNo,
        @NotBlank String telephoneNo,
        @Email @NotBlank String email,
        @Size(min = 8) String password
) {}