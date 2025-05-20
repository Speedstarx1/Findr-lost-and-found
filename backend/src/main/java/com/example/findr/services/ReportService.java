package com.example.findr.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.findr.dto.ReportRequestDTO;
import com.example.findr.dto.ReportResponseDTO;
import com.example.findr.exception.BusinessLogicException;
import com.example.findr.exception.ResourceNotFound;
import com.example.findr.model.Report;
import com.example.findr.model.ReportStatus;
import com.example.findr.model.User;
import com.example.findr.repositories.ReportRepo;

@Service
public class ReportService {

    @Autowired
    private ReportRepo reportRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<ReportResponseDTO> getAllReports() {
        return reportRepo.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ReportResponseDTO createReport(ReportRequestDTO reportRequest) {
        User currentUser = userService.getCurrentUser();

        Report report = modelMapper.map(reportRequest, Report.class);
        report.setUser(currentUser);

        Report newReport = reportRepo.save(report);
        return convertToDTO(newReport);
    }

    public void deleteReport(String id) {
        if (!reportRepo.existsById(id)) {
            throw new ResourceNotFound("Report not found with id: " + id);
        }
        reportRepo.deleteById(id);
    }

    public ReportResponseDTO getReportById(String id) {
        Report report = reportRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Report not found with id: " + id));
        return convertToDTO(report);
    }
    
    /**
     * Marks a report as closed (completed) using direct MongoDB update
     * Only the report owner can close their own report
     * Reports can only be closed if they're in OPEN or IN_PROGRESS state
     * 
     * @param id the ID of the report to close
     * @return the updated report
     * @throws ResourceNotFound if report not found
     * @throws AccessDeniedException if user is not the report owner
     * @throws BusinessLogicException if report is already closed
     */
    @Transactional
    public ReportResponseDTO closeReport(String id) {
        User currentUser = userService.getCurrentUser();
        
        Report report = reportRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Report not found with id: " + id));
        
        // Verify that the current user is the report owner
        if (!report.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Only the report owner can close this report");
        }
        
        // Verify the report isn't already closed
        if (report.getStatus() == ReportStatus.CLOSED) {
            throw new BusinessLogicException("This report is already closed");
        }
        
        try {
            // Use MongoTemplate to directly update the document in MongoDB
            Query query = new Query(Criteria.where("_id").is(id));
            Update update = new Update().set("status", ReportStatus.CLOSED);
            
            // Execute the update operation
            mongoTemplate.updateFirst(query, update, Report.class);
            
            // Fetch the updated report to return
            Report updatedReport = reportRepo.findById(id)
                    .orElseThrow(() -> new ResourceNotFound("Report not found after update"));
            
            return convertToDTO(updatedReport);
        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error while closing report: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    private ReportResponseDTO convertToDTO(Report report) {
        return modelMapper.map(report, ReportResponseDTO.class);
    }
}
