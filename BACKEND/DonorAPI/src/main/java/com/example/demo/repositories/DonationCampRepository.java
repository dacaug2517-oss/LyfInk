package com.example.demo.repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.DonationCamp;

@Repository
public interface DonationCampRepository extends JpaRepository<DonationCamp, Integer> {

    // Optional: Get only upcoming camps
    List<DonationCamp> findByDateGreaterThanEqual(Date date);

}
