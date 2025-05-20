package com.example.findr.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "reports")
public class Report extends AuditableEntity {
    @Id
    private String id;

    @NotNull(message = "Items cannot be null")
    @Size(min = 1, message = "At least one item must be specified")
    private List<Item> items = new ArrayList<>();

    @NotNull(message = "User cannot be null")
    @DBRef
    private User user;

    @NotNull(message = "Report type cannot be null")
    private ReportType type; // LOST or FOUND

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotBlank(message = "Location cannot be blank")
    private String location;

    @NotBlank(message = "Last seen cannot be blank")
    private LocalDateTime lastSeen;

    @NotNull(message = "Status cannot be null")
    private ReportStatus status = ReportStatus.OPEN; // Set default status to OPEN

    // Default constructor for MongoDB
    public Report() {
    }

    // Constructor for multiple Items
    public Report(List<Item> items, User user, ReportType type, String description, String location, LocalDateTime lastSeen, ReportStatus status) {
        this.items.addAll(items);
        this.user = user;
        this.type = type;
        this.description = description;
        this.location = location;
        this.lastSeen = lastSeen;
        this.status = status != null ? status : ReportStatus.OPEN; // Default to OPEN if null
    }
}