package com.example.findr.services;

import com.example.findr.model.Request;
import com.example.findr.repositories.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    @Autowired
    private RequestRepo requestRepo;

    public List<Request> getAllRequest() {
        return requestRepo.findAll();
    }

    public Request createRequest(Request request) {
        return requestRepo.save(request);
    }

    public void deleteRequest(String id) {
        requestRepo.deleteById(id);
    }

    public Request getRequestById(String id) {
        return requestRepo.findById(id).orElse(null);
    }

}
