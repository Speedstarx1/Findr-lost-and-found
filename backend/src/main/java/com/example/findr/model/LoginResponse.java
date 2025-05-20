package com.example.findr.model;


public record LoginResponse(
    String token
) {
    public String getTokenType() {
        return "Bearer";
    }
}
