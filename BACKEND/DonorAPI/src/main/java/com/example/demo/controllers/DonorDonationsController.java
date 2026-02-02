package com.example.demo.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.DonationHistoryDTO;
import com.example.demo.services.DonorDonationsService;

//@RestController
//@RequestMapping("/api/donor-donations")
//@CrossOrigin("*")
//public class DonorDonationsController {
//
//    @Autowired
//    private DonorDonationsService donorDonationsService;
//
//    // Add donation for a donor
//    @PostMapping("/add/{donorId}")
//    public ResponseEntity<DonorDonations> addDonation(
//        @PathVariable Integer donorId,
//        @RequestBody DonorDonations donation) {
//
//        return ResponseEntity.ok(
//            donorDonationsService.addDonation(donorId, donation)
//        );
//    }
//
//    // Get all donations of a donor
//    @GetMapping("/donor/{donorId}")
//    public ResponseEntity<List<DonorDonations>> getByDonor(
//        @PathVariable Integer donorId) {
//
//        return ResponseEntity.ok(
//            donorDonationsService.getDonationsByDonorId(donorId)
//        );
//    }
//
//    // Get donation by donationId
//    @GetMapping("/{donationId}")
//    public ResponseEntity<DonorDonations> getById(
//        @PathVariable Integer donationId) {
//
//        return ResponseEntity.ok(
//            donorDonationsService.getDonationById(donationId)
//        );
//    }
//
//    // Delete donation (admin/staff)
//    @DeleteMapping("/{donationId}")
//    public ResponseEntity<Void> delete(
//        @PathVariable Integer donationId) {
//
//        donorDonationsService.deleteDonation(donationId);
//        return ResponseEntity.noContent().build();
//    }
//}

@RestController
@RequestMapping("/api/donations")
@CrossOrigin("*")
public class DonorDonationsController {

    @Autowired
    private DonorDonationsService donorDonationsService;


    @GetMapping("/history/{donorId}")
    public List<DonationHistoryDTO> getDonationHistory(
            @PathVariable Integer donorId) {

        return donorDonationsService.getDonationHistoryById(donorId);
    }
}
