package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.BloodResponse;
import com.example.demo.repositories.BloodResponseRepository;

@Service
public class BloodResponseService {

    @Autowired
    private BloodResponseRepository repo;

    public BloodResponse save(BloodResponse response) {
        return repo.save(response);
    }
}
