package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.HBDetails;
import com.example.demo.repositories.HbDetailsRepository;

@Service
public class HbDetailsService {

    @Autowired
    private HbDetailsRepository hbDetailsRepository;

    // 🔥 Get hospital by ID (used internally if needed)
    public HBDetails getById(Integer id) {
        return hbDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospital not found"));
    }

    // 🔥 Get hospital by email (only if hospital login exists)
    public HBDetails getByEmail(String email) {
        return hbDetailsRepository.findByEmail(email);
    }
}
