package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.BloodRequest;
import com.example.demo.entities.BloodResponse;
import com.example.demo.services.BloodResponseService;

@RestController
@RequestMapping("/api")
public class BloodResponseController {

    @Autowired
    private BloodResponseService bloodResponseService;

    // ----------------------------
    // 1️⃣ Fetch blood requests from other hospitals
    // GET /api/request/others/{userid}
    // ----------------------------
    @GetMapping("/request/others/{userid}")
    public List<BloodRequest> getOtherRequests(@PathVariable int userid) {
        return bloodResponseService.getOtherHospitalRequests(userid);
    }

    // ----------------------------
    // 2️⃣ Save response for a blood request
    // POST /api/response/add
    // ----------------------------
    @PostMapping("/response/add")
    public BloodResponse addResponse(@RequestBody Map<String, String> payload) {
        int brid = Integer.parseInt(payload.get("brid"));
        String comment = payload.get("comment");
        String status = payload.get("status");

        return bloodResponseService.saveResponse(brid, comment, status);
    }

    // ----------------------------
    // 3️⃣ Get all responses for requests created by a user
    // GET /api/response/my-requests/{userid}
    // ----------------------------
    @GetMapping("/response/my-requests/{userid}")
    public List<BloodResponse> getResponsesForMyRequests(@PathVariable int userid) {
        return bloodResponseService.getResponsesForRequestsCreatedByUser(userid);
    }

    // ----------------------------
    // 4️⃣ Optional: Get requested blood summary
    // GET /api/request/summary
    // ----------------------------
    @GetMapping("/request/summary")
    public List<Object[]> getRequestedBloodSummary() {
        return bloodResponseService.getRequestedBloodSummary();
    }
}
