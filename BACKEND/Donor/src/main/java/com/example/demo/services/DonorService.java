package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.BloodComponent;
import com.example.demo.entities.Donor;
import com.example.demo.entities.Users;
import com.example.demo.repositories.BloodComponentRepository;
import com.example.demo.repositories.DonorRepository;
import com.example.demo.repositories.UsersRepository;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private BloodComponentRepository bloodComponentRepository;

    // Create or Update Donor Profile
    public Donor createOrUpdateDonor(Integer userId, Donor donor) {

        // ✅ Fetch user from DB
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ UPDATE USER TABLE ALSO (Firstname, Lastname, Email)
        if (donor.getUid() != null) {

            user.setFirstname(donor.getUid().getFirstname());
            user.setLastname(donor.getUid().getLastname());
            user.setEmail(donor.getUid().getEmail());

            // ✅ Save changes into USERS table
            usersRepository.save(user);
        }

        // ✅ Check if donor already exists
        List<Donor> donors = donorRepository.findByUserId(userId);
        Donor existingDonor = donors.isEmpty() ? null : donors.get(0);

        if (existingDonor != null) {

            // ✅ Update donor fields
            existingDonor.setGender(donor.getGender());
            existingDonor.setMedical_history(donor.getMedical_history());

            // ✅ Update Blood Component
            if (donor.getBcid() != null && donor.getBcid().getBcid() != null) {
                BloodComponent bc = bloodComponentRepository.findById(donor.getBcid().getBcid())
                        .orElseThrow(() -> new RuntimeException("Blood component not found"));

                existingDonor.setBcid(bc);
            }

            return donorRepository.save(existingDonor);

        } else {

            // ✅ Create new donor
            donor.setUid(user);

            if (donor.getBcid() != null && donor.getBcid().getBcid() != null) {
                BloodComponent bc = bloodComponentRepository.findById(donor.getBcid().getBcid())
                        .orElseThrow(() -> new RuntimeException("Blood component not found"));

                donor.setBcid(bc);
            }

            return donorRepository.save(donor);
        }
    }

    // Get Donor Profile by User ID
    public List<Donor> getDonorByUserId(Integer userId) {
        List<Donor> donors = donorRepository.findByUserId(userId);
        if (donors.isEmpty()) {
            throw new RuntimeException("Donor profile not found");
        }
        return donors;
    }

    // Get Donor by Donor ID
    public Donor getDonorById(Integer donorId) {
        return donorRepository.findById(donorId)
                .orElseThrow(() -> new RuntimeException("Donor not found"));
    }
    
    
}
