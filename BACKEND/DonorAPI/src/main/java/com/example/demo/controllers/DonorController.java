package com.example.demo.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entities.Donor;
import com.example.demo.services.DonorService;


@RestController
@RequestMapping("/api/donor")
@CrossOrigin("*")
public class DonorController {

    @Autowired
    private DonorService donorService;
    
 // Create or update donor profile
    @PostMapping("/profile/{userId}")
    public ResponseEntity<Donor> saveProfile(
            @PathVariable Integer userId,
            @RequestBody Donor donor) {

        Donor updatedDonor = donorService.createOrUpdateDonor(userId, donor);
        return ResponseEntity.ok(updatedDonor);
    }

    // Get donor profile(s) by user
    @GetMapping("/profile/{userId}")
    public ResponseEntity<List<Donor>> getProfile(@PathVariable Integer userId) {
        List<Donor> donors = donorService.getDonorByUserId(userId);
        return ResponseEntity.ok(donors);
    }

    // Get donor by donorId (internal use)
    @GetMapping("/{donorId}")
    public ResponseEntity<Donor> getById(@PathVariable Integer donorId) {
        Donor donor = donorService.getDonorById(donorId);
        return ResponseEntity.ok(donor);
    }
}

