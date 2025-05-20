package com.example.findr.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.findr.dto.DetailedRequestResponseDTO;
import com.example.findr.dto.ReportResponseDTO;
import com.example.findr.dto.RequestDTO;
import com.example.findr.dto.RequestResponseDTO;
import com.example.findr.dto.UserResponseDTO;
import com.example.findr.exception.BusinessLogicException;
import com.example.findr.exception.ResourceNotFound;
import com.example.findr.model.Report;
import com.example.findr.model.ReportStatus;
import com.example.findr.model.ReportType;
import com.example.findr.model.Request;
import com.example.findr.model.RequestStatus;
import com.example.findr.model.RequestType;
import com.example.findr.model.User;
import com.example.findr.repositories.ReportRepo;
import com.example.findr.repositories.RequestRepo;

@Service
public class RequestService {

    private final RequestRepo requestRepo;
    private final ReportRepo reportRepo;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public RequestService(RequestRepo requestRepo, ReportRepo reportRepo, UserService userService, ModelMapper modelMapper) {
        this.requestRepo = requestRepo;
        this.reportRepo = reportRepo;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public RequestResponseDTO createRequest(RequestDTO requestDTO) {
        User currentUser = userService.getCurrentUser();
        Report report = reportRepo.findById(requestDTO.reportId())
                .orElseThrow(() -> new ResourceNotFound("Report not found with id: " + requestDTO.reportId()));

        // Verify that the current user is not the creator of the report
        if (report.getUser().getId().equals(currentUser.getId())) {
            throw new BusinessLogicException("You cannot create a request for your own report");
        }

        // Verify that the report status is either OPEN or IN_PROGRESS
        if (report.getStatus() != ReportStatus.OPEN && report.getStatus() != ReportStatus.IN_PROGRESS) {
            throw new BusinessLogicException("Requests can only be made to reports that are OPEN or IN_PROGRESS");
        }

        // Check for existing requests from the same user for this report
        List<Request> existingRequests = requestRepo.findByReportAndRequester(report, currentUser);
        if (!existingRequests.isEmpty()) {
            // Filter to find active (PENDING) requests
            Optional<Request> pendingRequest = existingRequests.stream()
                .filter(r -> r.getStatus() == RequestStatus.PENDING)
                .findFirst();
            
            if (pendingRequest.isPresent()) {
                throw new BusinessLogicException("You already have an active request for this report");
            }
        }

        // Validate request type matches report type
        validateRequestTypeMatchesReportType(requestDTO.type(), report.getType());

        Request request = new Request();
        request.setReport(report);
        request.setRequester(currentUser);
        request.setType(requestDTO.type());
        request.setNote(requestDTO.note());

        Request newRequest = requestRepo.save(request);

        // TODO: Implement notification logic to alert the report owner
        return convertToDTO(newRequest);
    }

    /**
     * Validates that the request type is appropriate for the report type
     * - CLAIM requests can only be made on FOUND reports
     * - RETURN requests can only be made on LOST reports
     */
    private void validateRequestTypeMatchesReportType(RequestType requestType, ReportType reportType) {
        if (requestType == RequestType.CLAIM && reportType != ReportType.FOUND) {
            throw new BusinessLogicException("Claim requests can only be made on FOUND reports");
        }
        
        if (requestType == RequestType.RETURN && reportType != ReportType.LOST) {
            throw new BusinessLogicException("Return requests can only be made on LOST reports");
        }
    }

    @Transactional
    public RequestResponseDTO approveRequest(String requestId) {
        User currentUser = userService.getCurrentUser();
        Request request = requestRepo.findById(requestId)
                .orElseThrow(() -> new ResourceNotFound("Request not found with id: " + requestId));
        
        // Ensure only the report owner can approve requests
        if (!request.getReport().getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only the report owner can approve requests");
        }
        
        // Check if request is in a state that can be approved
        if (request.getStatus() != RequestStatus.PENDING) {
            throw new BusinessLogicException("Only pending requests can be approved");
        }

        request.setStatus(RequestStatus.APPROVED);
        request.setResolvedAt(LocalDateTime.now());

        Request updatedRequest = requestRepo.save(request);
        
        // Update report status if it's a claim request
        if (request.getType() == RequestType.CLAIM) {
            Report report = request.getReport();
            report.setStatus(ReportStatus.IN_PROGRESS);
            reportRepo.save(report);
        }
        
        return convertToDTO(updatedRequest);
    }

    @Transactional
    public RequestResponseDTO cancelRequest(String requestId) {
        User currentUser = userService.getCurrentUser();
        Request request = requestRepo.findById(requestId)
                .orElseThrow(() -> new ResourceNotFound("Request not found with id: " + requestId));
        
        // Ensure only the requester can cancel their own request
        if (!request.getRequester().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You can only cancel your own requests");
        }
        
        // Check if request is in a state that can be cancelled
        if (request.getStatus() != RequestStatus.PENDING) {
            throw new BusinessLogicException("Only pending requests can be cancelled");
        }

        request.setStatus(RequestStatus.CANCELLED);
        request.setResolvedAt(LocalDateTime.now());

        Request updatedRequest = requestRepo.save(request);
        return convertToDTO(updatedRequest);
    }

    @Transactional
    public RequestResponseDTO rejectRequest(String requestId) {
        User currentUser = userService.getCurrentUser();
        Request request = requestRepo.findById(requestId)
                .orElseThrow(() -> new ResourceNotFound("Request not found with id: " + requestId));
        
        // Ensure only the report owner can reject requests
        if (!request.getReport().getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only the report owner can reject requests");
        }
        
        // Check if request is in a state that can be rejected
        if (request.getStatus() != RequestStatus.PENDING) {
            throw new BusinessLogicException("Only pending requests can be rejected");
        }

        request.setStatus(RequestStatus.REJECTED);
        request.setResolvedAt(LocalDateTime.now());

        Request updatedRequest = requestRepo.save(request);
        return convertToDTO(updatedRequest);
    }

    /**
     * Get all requests - this should only be accessible to administrators
     * Regular users should use getRequestsForCurrentUserReports() or getRequestsMadeByCurrentUser() instead
     * 
     * @return list of all requests in the system
     * @throws AccessDeniedException if the current user is not an administrator
     */
    public List<RequestResponseDTO> getAllRequest() {
        // For now, we'll simply return all requests
        // TODO: Implement proper role-based access control to restrict this to admins only
        // e.g., if (!currentUser.hasRole("ADMIN")) throw new AccessDeniedException("Admin access required");
        
        return requestRepo.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteRequest(String id) {
        User currentUser = userService.getCurrentUser();
        Request request = requestRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Request not found with id: " + id));
                
        // Only allow deletion if user is either the requester or the report owner
        boolean isRequester = request.getRequester().getId().equals(currentUser.getId());
        boolean isReportOwner = request.getReport().getUser().getId().equals(currentUser.getId());
        
        if (!isRequester && !isReportOwner) {
            throw new AccessDeniedException("You don't have permission to delete this request");
        }
        
        requestRepo.deleteById(id);
    }

    public DetailedRequestResponseDTO getRequestById(String id) {
        User currentUser = userService.getCurrentUser();
        Request request = requestRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Request not found with id: " + id));
        
        // Verify that the current user is either the requester or the report owner
        boolean isRequester = request.getRequester().getId().equals(currentUser.getId());
        boolean isReportOwner = request.getReport().getUser().getId().equals(currentUser.getId());
        
        if (!isRequester && !isReportOwner) {
            throw new AccessDeniedException("You don't have permission to view this request");
        }
        
        return convertToDetailedDTO(request);
    }

    /**
     * Get all requests for reports owned by the current authenticated user
     * Acts as a notification system for report owners
     * @return list of requests on the current user's reports
     */
    public List<DetailedRequestResponseDTO> getRequestsForCurrentUserReports() {
        User currentUser = userService.getCurrentUser();
        
        // First, find all reports owned by the current user
        List<Report> userReports = reportRepo.findByUser(currentUser);
        
        // Then, find all requests that reference these reports
        List<Request> requests = requestRepo.findByReportIn(userReports);
        
        // Finally, convert to DTOs and return
        return requests.stream()
                .map(this::convertToDetailedDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get all requests made by the current authenticated user
     * @return list of requests made by the current user
     */
    public List<DetailedRequestResponseDTO> getRequestsMadeByCurrentUser() {
        User currentUser = userService.getCurrentUser();
        return requestRepo.findByRequester(currentUser).stream()
                .map(this::convertToDetailedDTO)
                .collect(Collectors.toList());
    }

    private RequestResponseDTO convertToDTO(Request request) {
        return new RequestResponseDTO(
            request.getId(),
            request.getReport().getId(),
            request.getRequester().getId(),
            request.getType(),
            request.getStatus(),
            request.getNote(),
            request.getCreatedAt(),
            request.getUpdatedAt(),
            request.getResolvedAt()
        );
    }
    
    /**
     * Converts a Request entity to a DetailedRequestResponseDTO with full report and requester information
     */
    private DetailedRequestResponseDTO convertToDetailedDTO(Request request) {
        // Convert Report to ReportResponseDTO
        ReportResponseDTO reportDTO = modelMapper.map(request.getReport(), ReportResponseDTO.class);
        
        // Convert User to UserResponseDTO
        UserResponseDTO requesterDTO = modelMapper.map(request.getRequester(), UserResponseDTO.class);
        
        // Create the detailed response with embedded data
        return new DetailedRequestResponseDTO(
            request.getId(),
            reportDTO,
            requesterDTO,
            request.getType(),
            request.getStatus(),
            request.getNote(),
            request.getCreatedAt(),
            request.getUpdatedAt(),
            request.getResolvedAt()
        );
    }
}
