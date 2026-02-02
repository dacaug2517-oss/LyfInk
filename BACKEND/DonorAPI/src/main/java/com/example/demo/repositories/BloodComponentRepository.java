package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.BloodComponent;

@Repository
public interface BloodComponentRepository 
        extends JpaRepository<BloodComponent, Integer> {

    @Query("SELECT b FROM BloodComponent b WHERE b.bc_name = :name")
//	@Query("SELECT b FROM BloodComponent b WHERE LOWER(b.bc_name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<BloodComponent> findByName(@Param("name") String name);

    List<BloodComponent> findByCategory(int category);
}
