package com.example.findr.model;

import lombok.Data;

@Data
public class Item {
    private String name;
    private ItemStatus status;

    // No-arg Constructor
    public Item() {}

    public Item(String name, ItemStatus status) {
        this.name = name;
        this.status = status;
    }
}
