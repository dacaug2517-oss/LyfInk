package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.BloodRequestDTO;
import com.example.demo.DTO.BloodRequestFullDTO;
import com.example.demo.entities.BloodRequest;
import com.example.demo.services.BloodRequestService;

@RestController
@RequestMapping("/api/bloodrequest")
public class BloodRequestController {
	
	 @Autowired
	    private BloodRequestService service;
	 
    @Autowired
    private BloodRequestService bloodRequestService;

    // ✅ SAVE REQUEST (NO JWT NOW)
    @PostMapping("/save")
    public ResponseEntity<?> saveRequest(@RequestBody BloodRequestDTO dto) {

        BloodRequest saved = bloodRequestService.saveRequest(dto);

        return ResponseEntity.ok(saved);
    }

    // ✅ GET ALL REQUESTS (NO FILTERING NOW)
    @GetMapping("/all")
    public ResponseEntity<?> getAllRequests() {

        List<BloodRequest> list = bloodRequestService.getAllRequests();

        return ResponseEntity.ok(list);
    }
    
 // ✅ GET Full Request Details by HBID
    @GetMapping("/full-details/{hbid}")
    public List<BloodRequestFullDTO> getFullDetails(@PathVariable int hbid) {

        return service.getFullDetails(hbid);
    }
}

