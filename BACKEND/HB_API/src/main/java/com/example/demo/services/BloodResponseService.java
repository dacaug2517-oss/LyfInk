package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.BloodRequest;
import com.example.demo.entities.BloodResponse;
import com.example.demo.repositories.BloodRequestRepository;
import com.example.demo.repositories.BloodResponseRepository;

@Service
public class BloodResponseService {

    @Autowired
    private BloodResponseRepository bloodResponseRepository;

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    // ----------------------------
    // Save a response for a blood request
    // ----------------------------
    public BloodResponse saveResponse(int brid, String comment, String status) {
        BloodRequest request = bloodRequestRepository.findById(brid)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        BloodResponse response = new BloodResponse();
        response.setBrid(request);
        response.setComment(comment.getBytes()); // convert string to byte[]
        response.setStatus(status);

        return bloodResponseRepository.save(response);
    }

    // ----------------------------
    // Fetch blood requests NOT created by this user
    // ----------------------------
    public List<BloodRequest> getOtherHospitalRequests(int userid) {
        // Uses the query you already have in BloodRequestRepository
        return bloodRequestRepository.findAllExceptUser(userid);
    }

    // ----------------------------
    // Fetch requested blood summary
    // ----------------------------
    public List<Object[]> getRequestedBloodSummary() {
        return bloodRequestRepository.getRequestedBlood();
    }

    // ----------------------------
    // Get all responses for requests created by this user
    // ----------------------------
    public List<BloodResponse> getResponsesForRequestsCreatedByUser(int userid) {
        return bloodResponseRepository.findResponsesForRequestsCreatedByUser(userid);
    }
}
