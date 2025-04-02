package com.example.findr.controllers;


import com.example.findr.model.Request;
import com.example.findr.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @GetMapping
    public List<Request> getAllRequest() {
        return requestService.getAllRequest();
    }

    @GetMapping("/{id}")
    public Request getRequestById(@PathVariable String id) {
        return requestService.getRequestById(id);
    }

    @PostMapping
    public Request createRequest(@RequestBody Request request) {
        return requestService.createRequest(request);
    }

    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable String id) {
        requestService.deleteRequest(id);
    }

}
