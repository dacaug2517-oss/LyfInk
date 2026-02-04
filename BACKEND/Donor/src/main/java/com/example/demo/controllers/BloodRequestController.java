package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.BloodRequestHospitalDTO;
import com.example.demo.services.BloodRequestService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/request")
public class BloodRequestController {

    @Autowired
    private BloodRequestService bloodRequestService;

    // ✅ API USING BCID (INT)
    @GetMapping("/blood/hospital/{bcid}")
    public List<BloodRequestHospitalDTO> getWithHospital(@PathVariable int bcid) {
        return bloodRequestService.getRequestsWithHospital(bcid);
    }
}
