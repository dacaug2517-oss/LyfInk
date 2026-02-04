package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.HbDetails;

public interface HbDetailsRepository extends JpaRepository<HbDetails, Integer> {

    // ✅ Fetch hospital using logged-in email (JWT subject)
    @Query("SELECT h FROM HbDetails h WHERE h.user.email = :email")
    Optional<HbDetails> findHospitalByEmail(@Param("email") String email);
}
