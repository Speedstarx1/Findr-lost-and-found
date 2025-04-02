package com.example.findr.repositories;

import com.example.findr.model.Report;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepo extends MongoRepository<Report, String> {
}
