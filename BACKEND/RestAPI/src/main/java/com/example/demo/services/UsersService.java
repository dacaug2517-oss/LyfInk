package com.example.demo.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.RegisterRequest;
import com.example.demo.entities.*;
import com.example.demo.repositories.*;

@Service
public class UsersService {

    @Autowired UsersRepository userRepo;
    @Autowired RoleRepository roleRepo;
    @Autowired StateRepository stateRepo;
    @Autowired CityRepository cityRepo;
    @Autowired BloodComponentRepository bloodComponentRepo;
    @Autowired HbDetailsRepository hbDetailsRepo;

    // ===========================
    // ✅ REGISTER METHOD
    // ===========================
    public Users register(RegisterRequest req) {

        // ✅ NEW: Fetch existing user first
        Users existingUser = userRepo.findByEmail(req.getEmail());

        // ✅ Prevent duplicate email (Only for Donor)
        if (req.getRid() == 2 && existingUser != null) {
            throw new RuntimeException("Email already exists!");
        }

        // ===========================
        // ✅ NEW: Hospital/BloodBank Registration Rule
        // ===========================
        if (req.getRid() == 3) {

            // ❌ If user not found in USERS table → throw error
            if (existingUser == null) {
                throw new RuntimeException(
                    "User not found in USERS table! Hospital/BloodBank cannot register."
                );
            }

            // ✅ If user exists → Save ONLY HB_DETAILS
            if (req.getHbDetails() != null) {

                HbDetails hb = new HbDetails();

                hb.setName(req.getHbDetails().getHb_name());
                hb.setEmail(req.getHbDetails().getHb_email());
                hb.setHb_password(req.getHbDetails().getHb_password());
                hb.setPhone(req.getHbDetails().getHb_phno());

                hb.setRegNo(req.getHbDetails().getReg_no());
                hb.setGstNo(req.getHbDetails().getGst_no());
                hb.setType(req.getHbDetails().getType());

                // ✅ Link hospital → existing user
                hb.setUser(existingUser);

                // ✅ Save ONLY in HB_DETAILS
                hbDetailsRepo.save(hb);

                System.out.println("✅ Hospital/BloodBank saved successfully!");

                // ✅ Return existing user (No new insert in USERS)
                return existingUser;
            }
        }

        // ===========================
        // Existing Code Continues Normally
        // ===========================

        Role role = roleRepo.findById(req.getRid()).orElseThrow();
        State state = stateRepo.findById(req.getStateid()).orElseThrow();
        City city = cityRepo.findById(req.getCityid()).orElseThrow();

        // ✅ Save Admin/Donor into USERS
        Users user = new Users();
        user.setFirstname(req.getFirstname());
        user.setLastname(req.getLastname());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());
        user.setMobno(req.getMobno());
        user.setAddress(req.getAddress());

        user.setSecurity_question(req.getSecurity_question());
        user.setSecurity_answer(req.getSecurity_answer());

        user.setRole(role);
        user.setState(state);
        user.setCity(city);

        // ===========================
        // ✅ Donor Registration (rid=2)
        // ===========================
        if (req.getRid() == 2 && req.getDonorDetails() != null) {

            Donor donor = new Donor();
            donor.setDob(req.getDonorDetails().getDob());
            donor.setGender(req.getDonorDetails().getGender());
            donor.setMedical_history(req.getDonorDetails().getMedical_history());

            BloodComponent bc = bloodComponentRepo
                    .findById(req.getDonorDetails().getBcid())
                    .orElseThrow(() -> new RuntimeException("Invalid Blood Component"));

            donor.setBloodComponent(bc);

            donor.setUser(user);
            user.setDonor(donor);
        }

        // ✅ Save Admin/Donor in USERS
        Users savedUser = userRepo.save(user);

        // ===========================
        // ✅ Admin Registers Hospital (rid=1)
        // ===========================
        if (req.getRid() == 3 && req.getHbDetails() != null) {

            HbDetails hb = new HbDetails();

            hb.setName(req.getHbDetails().getHb_name());
            hb.setEmail(req.getHbDetails().getHb_email());
            hb.setHb_password(req.getHbDetails().getHb_password());
            hb.setPhone(req.getHbDetails().getHb_phno());

            hb.setRegNo(req.getHbDetails().getReg_no());
            hb.setGstNo(req.getHbDetails().getGst_no());
            hb.setType(req.getHbDetails().getType());

            // ✅ Link hospital → admin
            hb.setUser(savedUser);

            // ✅ Save ONLY in HB_DETAILS
            hbDetailsRepo.save(hb);

            System.out.println("✅ Hospital/BloodBank saved successfully!");
        }

        return savedUser;
    }

 // ===========================
 //  LOGIN METHOD (FINAL WORKING)
 // ===========================
 public Object loginUser(String email, String password) {

     Map<String, Object> result = new HashMap<>();

     // ===========================
     // Check USERS table first
     // ===========================
     Users user = userRepo.findByEmail(email);

     if (user != null) {

         if (!user.getPassword().equals(password)) {
             throw new RuntimeException("Invalid Password!");
         }

         result.put("userid", user.getUserid());
         result.put("email", user.getEmail());
         result.put("rid", user.getRole().getRid());

         return result;
     }

     // ===========================
     //  If not found → Check HB_DETAILS table
     // ===========================
     HbDetails hb = hbDetailsRepo.findByEmail(email);

     if (hb != null) {

         if (!hb.getHb_password().equals(password)) {
             throw new RuntimeException("Invalid Password!");
         }

         result.put("hbid", hb.getHbid());
         result.put("email", hb.getEmail());

         // ✅ Hospital/BloodBank role fixed rid=3
         result.put("rid", 3);

         return result;
     }

     // ===========================
     //  Not found in both tables
     // ===========================
     throw new RuntimeException("User Not Found!");
 }

}
