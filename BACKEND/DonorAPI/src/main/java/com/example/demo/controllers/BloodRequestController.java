package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.BloodRequest;
import com.example.demo.services.BloodRequestService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/request")
public class BloodRequestController {

    @Autowired
    private BloodRequestService bloodRequestService;

    @GetMapping
    public List<BloodRequest> getAll() {
        return bloodRequestService.getAllRequest();
    }

//    @GetMapping("/blood")
//    public List<Map<String, Object>> getRequests() {
//        return bloodRequestService.getRequestedBlood();
//    }
    @GetMapping("/blood/{bloodGroup}")
    public List<BloodRequest> getByBloodGroup(@PathVariable String bloodGroup) {
        return bloodRequestService.getRequestsByBloodGroup(bloodGroup);
    }


    @PostMapping("/saverequest")
    public BloodRequest save(@RequestBody BloodRequest request) {
        return bloodRequestService.saveAllRequest(request);
    }
    
}