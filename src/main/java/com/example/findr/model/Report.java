package com.example.findr.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "reports")
public class Report {
    @Id
    private String id;
    private List<Item> items = new ArrayList<>();
    private User user;
    private String description;
    private String location;
    private LocalDateTime lastSeen;
    private ReportStatus status;

    // No-arg Constructor
    public Report() {}

    // Constructor for single Item
    public Report(Item item, User user, String description, String location, LocalDateTime lastSeen, ReportStatus status) {
        this.items.add(item);
        this.user = user;
        this.description = description;
        this.location = location;
        this.lastSeen = lastSeen;
        this.status = status;
    }

    // Constructor for multiple Items
    public Report(List<Item> items, User user, String description, String location, LocalDateTime lastSeen, ReportStatus status) {
        this.items.addAll(items);
        this.user = user;
        this.description = description;
        this.location = location;
        this.lastSeen = lastSeen;
        this.status = status;
    }

    // Getters
    public String getId() {
        return this.id;
    }

    public List<Item> getItems() {
        return this.items;
    }

    public User getUser() {
        return this.user;
    }

    public String getDescription() {
        return this.description;
    }

    public String getLocation() {
        return this.location;
    }

    public LocalDateTime getLastSeen() {
        return this.lastSeen;
    }

    public ReportStatus getReportStatus() {
        return this.status;
    }


    // Setters
    public void setItems(List<Item> items) { this.items = items; }

    public void setUser(User user) { this.user = user; }

    public void setDescription(String description) { this.description = description; }

    public void setLocation(String location) { this.location = location; }

    public void setLastSeen(LocalDateTime lastSeen) { this.lastSeen = lastSeen; }

    public void setStatus(ReportStatus status) { this.status = status; }
}