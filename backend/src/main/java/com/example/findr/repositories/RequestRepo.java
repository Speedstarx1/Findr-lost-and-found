package com.example.findr.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.findr.model.Report;
import com.example.findr.model.Request;
import com.example.findr.model.User;

@Repository
public interface RequestRepo extends MongoRepository<Request, String> {
    List<Request> findByReportAndRequester(Report report, User requester);

    List<Request> findByReportIn(List<Report> reports);

    List<Request> findByRequester(User user);
}
