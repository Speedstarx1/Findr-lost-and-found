package com.example.findr.dto;

import java.time.LocalDateTime;

import com.example.findr.model.RequestStatus;
import com.example.findr.model.RequestType;

public record DetailedRequestResponseDTO(
        String id,
        ReportResponseDTO report,
        UserResponseDTO requester,
        RequestType type,
        RequestStatus status,
        String note,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime resolvedAt
) {}