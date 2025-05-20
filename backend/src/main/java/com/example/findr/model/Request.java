package com.example.findr.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "requests")
public class Request extends AuditableEntity {
    @Id
    private String id;

    @NotNull
    @DBRef
    private Report report;

    @NotNull
    @DBRef
    private User requester;

    @NotNull
    private RequestStatus status = RequestStatus.PENDING;

    @NotNull
    private RequestType type;

    @NotNull
    private String note;

    private LocalDateTime resolvedAt;
    
    // Default constructor
    public Request() {
    }
}