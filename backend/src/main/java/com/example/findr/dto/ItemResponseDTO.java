package com.example.findr.dto;

import com.example.findr.model.ItemStatus;

import lombok.Data;

@Data
public class ItemResponseDTO {
    private String name;
    private ItemStatus status;
    
    // Default constructor 
    public ItemResponseDTO() {}
    
    // Parameterized constructor
    public ItemResponseDTO(String name, ItemStatus status) {
        this.name = name;
        this.status = status;
    }
}
