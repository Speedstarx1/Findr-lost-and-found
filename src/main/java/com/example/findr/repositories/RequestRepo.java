package com.example.findr.repositories;

import com.example.findr.model.Request;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepo extends MongoRepository<Request, String> {
}
