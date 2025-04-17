package com.example.findr.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.findr.dto.DetailedRequestResponseDTO;
import com.example.findr.dto.RequestDTO;
import com.example.findr.dto.RequestResponseDTO;
import com.example.findr.services.RequestService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping
    public ResponseEntity<List<RequestResponseDTO>> getAllRequests() {
        return ResponseEntity.status(HttpStatus.OK).body(requestService.getAllRequest());
    }
    
    /**
     * Gets all requests on the current user's reports (notifications)
     * @return list of requests for the current user's reports
     */
    @GetMapping("/my-reports")
    public ResponseEntity<List<DetailedRequestResponseDTO>> getRequestsForMyReports() {
        return ResponseEntity.status(HttpStatus.OK).body(requestService.getRequestsForCurrentUserReports());
    }
    
    /**
     * Gets all requests made by the current user
     * @return list of requests made by the current user
     */
    @GetMapping("/my-requests")
    public ResponseEntity<List<DetailedRequestResponseDTO>> getMyRequests() {
        return ResponseEntity.status(HttpStatus.OK).body(requestService.getRequestsMadeByCurrentUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetailedRequestResponseDTO> getRequestById(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(requestService.getRequestById(id));
    }

    @PostMapping
    public ResponseEntity<RequestResponseDTO> createRequest(@Valid @RequestBody RequestDTO request) {
        RequestResponseDTO response = requestService.createRequest(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}/react")
    public ResponseEntity<RequestResponseDTO> reactToRequest(@PathVariable String id, @RequestParam("action") String action) {
        RequestResponseDTO response;
        switch (action.toLowerCase()) {
            case "approve" -> response = requestService.approveRequest(id);

            case "reject" -> response = requestService.rejectRequest(id);

            case "cancel" -> response = requestService.cancelRequest(id);

            default -> throw new IllegalArgumentException("Invalid action");
        }

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable String id) {
        requestService.deleteRequest(id);
    }

}
