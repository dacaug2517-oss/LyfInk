package com.example.demo.services;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.DonationCamp;
import com.example.demo.repositories.DonationCampRepository;

@Service
public class DonationCampService {

    @Autowired
    private DonationCampRepository donationCampRepository;

    // 🔹 Get all camps
    public List<DonationCamp> getAllCamps() {
        return donationCampRepository.findAll();
    }

    // 🔹 Get only upcoming camps (recommended)
    public List<DonationCamp> getUpcomingCamps() {
        Date today = new Date(System.currentTimeMillis());
        return donationCampRepository.findByDateGreaterThanEqual(today);
    }

    // 🔹 Get camp by ID
    public DonationCamp getCampById(int id) {
        return donationCampRepository.findById(id).orElse(null);
    }

}
