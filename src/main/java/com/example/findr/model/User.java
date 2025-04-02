package com.example.findr.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private Integer matriculationNo;
    private Integer telephoneNo;
    private String email;

    // No-Arg Constructor
    public User() {}


    // Constructor
    public User(String name, Integer matriculationNo, Integer telephoneNo, String email) {
        this.name = name;
        this.matriculationNo = matriculationNo;
        this.telephoneNo = telephoneNo;
        this.email = email;
    }


    // Getters
    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public Integer getMatriculationNo() {
        return this.matriculationNo;
    }

    public Integer getTelephoneNo() {
        return this.telephoneNo;
    }

    public String getEmail() {
        return this.email;
    }



    // Setters
    public void setName(String name) {
        this.name = name;
    }
    public void setMatriculationNo(Integer matriculationNo) {
        this.matriculationNo = matriculationNo;
    }
    public void setTelephoneNo(Integer telephoneNo) {
        this.telephoneNo = telephoneNo;
    }
    public void setEmail(String email) {
        this.email = email;
    }

}
