package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entities.DonationCamp;
import com.example.demo.repositories.DonationCampRepository;

@Service
public class DonationCampServiceImpl implements DonationCampService {

    @Autowired
    private DonationCampRepository repository;

    @Override
    public DonationCamp saveDonationCamp(DonationCamp camp) {
        return repository.save(camp);
    }
}
