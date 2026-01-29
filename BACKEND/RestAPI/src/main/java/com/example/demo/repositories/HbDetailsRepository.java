package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.HbDetails;

@Repository
public interface HbDetailsRepository extends JpaRepository<HbDetails, Integer> {

    HbDetails findByEmail(String email);
}

