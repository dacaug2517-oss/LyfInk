package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.BloodComponent;

public interface BloodComponentRepository extends JpaRepository<BloodComponent, Integer> {

    // ✅ Used for Dropdown (Category = 1)
    List<BloodComponent> findByCategory(int category);
}
