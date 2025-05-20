package com.example.findr.config;

import java.util.Collections;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.findr.dto.ItemResponseDTO;
import com.example.findr.dto.ReportResponseDTO;
import com.example.findr.dto.RequestResponseDTO;
import com.example.findr.dto.UserResponseDTO;
import com.example.findr.model.Item;
import com.example.findr.model.Report;
import com.example.findr.model.Request;
import com.example.findr.model.User;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration()
            .setMatchingStrategy(MatchingStrategies.STRICT)
            .setSkipNullEnabled(true);

        // User to UserResponseDTO mapping
        modelMapper.createTypeMap(User.class, UserResponseDTO.class)
            .setProvider(request -> new UserResponseDTO(
                ((User) request.getSource()).getId(),
                ((User) request.getSource()).getName(),
                ((User) request.getSource()).getMatriculationNo(),
                ((User) request.getSource()).getTelephoneNo(),
                ((User) request.getSource()).getEmail()
            ));

        // Request to RequestResponseDTO mapping
        modelMapper.createTypeMap(Request.class, RequestResponseDTO.class)
            .setProvider(request -> {
                Request req = (Request) request.getSource();
                return new RequestResponseDTO(
                    req.getId(),
                    req.getReport() != null ? req.getReport().getId() : null,
                    req.getRequester() != null ? req.getRequester().getId() : null,
                    req.getType(),
                    req.getStatus(),
                    req.getNote(),
                    req.getCreatedAt(),
                    req.getUpdatedAt(),
                    req.getResolvedAt()
                );
            });
            
        // Item to ItemResponseDTO mapping
        modelMapper.createTypeMap(Item.class, ItemResponseDTO.class)
            .setProvider(request -> {
                Item item = (Item) request.getSource();
                return new ItemResponseDTO(
                    item.getName(),
                    item.getStatus() != null ? item.getStatus() : null
                );
            });
            
        // Report to ReportResponseDTO mapping
        modelMapper.createTypeMap(Report.class, ReportResponseDTO.class)
            .setProvider(request -> {
                Report report = (Report) request.getSource();
                ReportResponseDTO dto = new ReportResponseDTO();
                
                dto.setId(report.getId());
                dto.setType(report.getType()); // Set the ReportType
                dto.setDescription(report.getDescription());
                dto.setLocation(report.getLocation());
                dto.setLastSeen(report.getLastSeen());
                
                // Ensure status is set and defaulted to OPEN if null
                dto.setStatus(report.getStatus() != null ? report.getStatus() : com.example.findr.model.ReportStatus.OPEN);
                
                dto.setCreatedAt(report.getCreatedAt());
                dto.setUpdatedAt(report.getUpdatedAt());
                
                // Handle user mapping explicitly
                if (report.getUser() != null) {
                    UserResponseDTO userDto = modelMapper.map(report.getUser(), UserResponseDTO.class);
                    dto.setUser(userDto);
                }
                
                // Handle items mapping with null safety
                if (report.getItems() != null) {
                    dto.setItems(report.getItems().stream()
                        .map(item -> modelMapper.map(item, ItemResponseDTO.class))
                        .collect(Collectors.toList()));
                } else {
                    dto.setItems(Collections.emptyList());
                }
                
                return dto;
            });
            
        return modelMapper;
    }
}