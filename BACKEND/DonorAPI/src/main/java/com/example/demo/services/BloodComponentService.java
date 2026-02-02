package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.BloodComponent;
import com.example.demo.repositories.BloodComponentRepository;

@Service
public class BloodComponentService {

    @Autowired
    private BloodComponentRepository bloodComponentRepository;


    // Get all blood components
    public List<BloodComponent> getAllComponents() {
        return bloodComponentRepository.findAll();
    }

    // Get blood component by ID
    public BloodComponent getComponentById(Integer id) {
        return bloodComponentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Blood component not found"));
    }

    // Get blood components by name
    public List<BloodComponent> getByName(String name) {
        return bloodComponentRepository.findByName(name);
    }


    // Get blood components by category
    public List<BloodComponent> getByCategory(int category) {
        return bloodComponentRepository.findByCategory(category);
    }

    // Update blood component
    public BloodComponent updateComponent(Integer id, BloodComponent updated) {

        BloodComponent existing = getComponentById(id);

        existing.setBc_name(updated.getBc_name());
        existing.setCategory(updated.getCategory());

        return bloodComponentRepository.save(existing);
    }
    
    
 // Get only blood groups
    public List<BloodComponent> getBloodGroups() {
        // Assuming category = 1 means blood group
        return bloodComponentRepository.findByCategory(1);
    }

    // Delete blood component
    public void deleteComponent(Integer id) {
        bloodComponentRepository.deleteById(id);
    }
}
