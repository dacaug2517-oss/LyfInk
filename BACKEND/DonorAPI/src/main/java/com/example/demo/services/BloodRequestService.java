package com.example.demo.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.BloodRequest;
import com.example.demo.repositories.BloodRequestRepository;

@Service
public class BloodRequestService {

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    public List<Map<String, Object>> getRequestedBlood() {

        List<Object[]> data = bloodRequestRepository.getRequestedBlood();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : data) {

            String bloodType = (String) row[0];
            Integer quantity = (Integer) row[1];

            int safeQty = quantity != null ? quantity : 0;
//            String status = safeQty >= 5 ? "HIGH" : "LOW";

            Map<String, Object> map = new HashMap<>();
            map.put("type", bloodType);
            map.put("count", safeQty);
//            map.put("status", status);

            result.add(map);
        }

        return result;
    }

    public List<BloodRequest> getAllRequest() {
        return bloodRequestRepository.findAll();
    }

    public BloodRequest saveAllRequest(BloodRequest request) {
        return bloodRequestRepository.save(request);
    }
    public List<BloodRequest> getRequestsByBloodGroup(String bloodGroup) {
        return bloodRequestRepository.findByBloodGroup(bloodGroup);
    }



}