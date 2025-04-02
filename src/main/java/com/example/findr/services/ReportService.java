package com.example.findr.services;

import com.example.findr.model.Report;
import com.example.findr.repositories.ReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepo reportRepo;

    public List<Report> getAllReports() {
        return reportRepo.findAll();
    }

    public Report createReport(Report report) {
        return reportRepo.save(report);
    }

    public void deleteReport(String id) {
        reportRepo.deleteById(id);
    }

    public Report getReportById(String id) {
        return reportRepo.findById(id).orElse(null);
    }

}
