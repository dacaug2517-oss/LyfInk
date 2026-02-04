package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.DonationCamp;
import com.example.demo.services.DonationCampService;

@RestController
@RequestMapping("/api/camps")
@CrossOrigin(origins = "http://localhost:3000")
public class DonationCampController {

    @Autowired
    private DonationCampService donationCampService;

    // 🔹 GET all camps
    @GetMapping
    public List<DonationCamp> getAllCamps() {
        return donationCampService.getAllCamps();
    }

    // 🔹 GET only upcoming camps
    @GetMapping("/upcoming")
    public List<DonationCamp> getUpcomingCamps() {
        return donationCampService.getUpcomingCamps();
    }

    // 🔹 GET by ID
    @GetMapping("/{id}")
    public DonationCamp getCampById(@PathVariable int id) {
        return donationCampService.getCampById(id);
    }

}
