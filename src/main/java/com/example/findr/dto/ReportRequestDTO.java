package com.example.findr.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.example.findr.model.Item;
import com.example.findr.model.ReportStatus;
import com.example.findr.model.ReportType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ReportRequestDTO {
    @NotNull
    @Size(min = 1, max = 100)
    private List<Item> items;

    @NotNull(message = "Report type cannot be null")
    private ReportType type;

    @NotBlank
    private String description;

    @NotBlank
    private String location;

    @NotNull
    private LocalDateTime lastSeen;

    @NotNull
    private ReportStatus status;
}
