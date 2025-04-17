package com.example.findr.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.findr.model.Report;
import com.example.findr.model.User;

@Repository
public interface ReportRepo extends MongoRepository<Report, String> {

    List<Report> findByUser(User user);
}
