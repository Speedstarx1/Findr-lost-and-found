package com.example.findr.dto;

import com.example.findr.model.RequestType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RequestDTO(
        @NotNull String reportId,
        @NotNull RequestType type,
        @NotBlank String note
) {}