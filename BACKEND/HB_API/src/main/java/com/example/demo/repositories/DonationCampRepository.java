package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.DonationCamp;

@Repository
public interface DonationCampRepository extends JpaRepository<DonationCamp, Integer> {
}
