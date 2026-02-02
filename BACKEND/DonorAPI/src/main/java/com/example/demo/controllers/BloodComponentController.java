package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.BloodComponent;
import com.example.demo.services.BloodComponentService;

@RestController
@RequestMapping("/api/blood-components")
@CrossOrigin("*")
public class BloodComponentController {

    @Autowired
    private BloodComponentService bloodComponentService;

    @GetMapping("/blood-groups")
    public ResponseEntity<List<BloodComponent>> getBloodGroups() {
        return ResponseEntity.ok(
            bloodComponentService.getBloodGroups()
        );
    }

    // Get all blood components
    @GetMapping
    public ResponseEntity<List<BloodComponent>> getAll() {
        return ResponseEntity.ok(
            bloodComponentService.getAllComponents()
        );
    }

    // Get blood component by ID
    @GetMapping("/{id}")
    public ResponseEntity<BloodComponent> getById(
        @PathVariable Integer id) {

        return ResponseEntity.ok(
            bloodComponentService.getComponentById(id)
        );
    }

    // Get by name
    @GetMapping("/name/{name}")
    public ResponseEntity<List<BloodComponent>> getByName(
            @PathVariable String name) {

        return ResponseEntity.ok(
            bloodComponentService.getByName(name)
        );
    }


    // Get by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<BloodComponent>> getByCategory(
        @PathVariable int category) {

        return ResponseEntity.ok(
            bloodComponentService.getByCategory(category)
        );
    }

    // Update blood component
    @PutMapping("/{id}")
    public ResponseEntity<BloodComponent> update(
        @PathVariable Integer id,
        @RequestBody BloodComponent component) {

        return ResponseEntity.ok(
            bloodComponentService.updateComponent(id, component)
        );
    }
    



    // Delete blood component
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
        @PathVariable Integer id) {

        bloodComponentService.deleteComponent(id);
        return ResponseEntity.noContent().build();
    }
}
