package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.BloodComponent;
import com.example.demo.services.BloodComponentService;

@RestController
@RequestMapping("/api/bloodcomponents")
@CrossOrigin("*")
public class BloodComponentController {

    @Autowired
    private BloodComponentService service;

    // ✅ Dropdown API (Only Category 1)
    @GetMapping("/category/{cat}")
    public List<BloodComponent> getByCategory(@PathVariable int cat) {
        return service.getByCategory(cat);
    }
    
    
    //Prajwal
 // Get all blood components
    @GetMapping
    public ResponseEntity<List<BloodComponent>> getAll() {
        return ResponseEntity.ok(
            service.getAllComponents()
        );
    }
}
