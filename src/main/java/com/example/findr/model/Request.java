package com.example.findr.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "requests")
public class Request {
    @Id
    private String id;
    private String note;
    private User user;
    private RequestType type;
    private RequestStatus status;

    // No-arg Constructor
    public Request() {}

    // Constructor
    public Request(String note, User user, RequestType type, RequestStatus status) {
        this.note = note;
        this.user = user;
        this.type = type;
        this.status = status;
    }

    // Getters
    public String getId() {
        return this.id;
    }
    public String getNote() {
        return this.note;
    }
    public User getUser() {
        return this.user;
    }
    public RequestType getRequestType() {
        return this.type;
    }
    public RequestStatus getRequestStatus() {
        return this.status;
    }


    // Setters
    public void setNote(String note) {
        this.note = note;
    }
    public void setType(RequestType type) {
        this.type = type;
    }
    public void setStatus(RequestStatus status) {
        this.status = status;
    }
}
