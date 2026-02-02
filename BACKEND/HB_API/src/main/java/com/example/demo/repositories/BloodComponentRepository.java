package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.BloodComponent;

public interface BloodComponentRepository extends JpaRepository<BloodComponent, Integer> {

    // ✅ Used for Dropdown (Category = 1)
    List<BloodComponent> findByCategory(int category);
    
    @Query("SELECT b FROM BloodComponent b WHERE b.bc_name = :name")
    List<BloodComponent> findByName(@Param("name") String name);
}
