package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.BloodResponseDTO;
import com.example.demo.entities.BloodRequest;
import com.example.demo.entities.BloodResponse;
import com.example.demo.repositories.BloodRequestRepository;
import com.example.demo.repositories.BloodResponseRepository;

@RestController
@RequestMapping("/api/response")
@CrossOrigin(origins = "http://localhost:3000")
public class BloodResponseController {

    @Autowired
    private BloodResponseRepository responseRepo;

    @Autowired
    private BloodRequestRepository requestRepo;

    @PostMapping("/data")
    public BloodResponse addResponse(@RequestBody BloodResponseDTO dto) {

        // ✅ Find request by brid
        BloodRequest request = requestRepo.findById(dto.brid)
                .orElseThrow(() -> new RuntimeException("Blood Request Not Found"));

        // ✅ Create response object
        BloodResponse response = new BloodResponse();
        response.setBrid(request);
        response.setComment(dto.comment);
        response.setStatus(dto.status);

        // ✅ Save into DB
        return responseRepo.save(response);
    }
}
