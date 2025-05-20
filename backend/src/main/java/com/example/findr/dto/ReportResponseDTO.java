package com.example.findr.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.example.findr.model.ReportStatus;
import com.example.findr.model.ReportType;

import lombok.Data;

@Data
public class ReportResponseDTO {
    private String id;
    private List<ItemResponseDTO> items;
    private UserResponseDTO user;
    private ReportType type;
    private String description;
    private String location;
    private LocalDateTime lastSeen;
    private ReportStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
