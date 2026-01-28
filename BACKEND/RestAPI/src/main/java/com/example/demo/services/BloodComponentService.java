package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.BloodComponent;
import com.example.demo.repositories.BloodComponentRepository;

@Service
public class BloodComponentService {

    @Autowired
    private BloodComponentRepository repo;

    public List<BloodComponent> getByCategory(int category) {
        return repo.findByCategory(category);
    }
}
