package com.example.findr.model;

import org.springframework.data.annotation.Id;

public class Item {
    @Id
    private String id;
    private Report report;
    private String name;
    private ItemStatus status;

    // No-arg Constructor
    public Item() {}

    // Constructor
    public Item(Report report, String name, ItemStatus status) {
        this.report = report;
        this.name = name;
        this.status = status;
    }

    // Getters
    public String getId() {
        return this.id;
    }
    public String getName() {
        return this.name;
    }
    public ItemStatus getItemStatus() {
        return this.status;
    }
    public Report getReport() {
        return this.report;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }
    public void setItemStatus(ItemStatus status) {
        this.status = status;
    }
}
