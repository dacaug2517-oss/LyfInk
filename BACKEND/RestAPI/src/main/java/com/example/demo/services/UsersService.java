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

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Autowired
    private com.example.demo.util.JwtUtil jwtUtil;

    // ===========================
    // ✅ REGISTER METHOD
    // ===========================
    // ✅ REGISTER METHOD - Returns AuthResponse with Token
    public Object register(RegisterRequest req) {

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
                // ✅ Encode Password
                hb.setHb_password(passwordEncoder.encode(req.getHbDetails().getHb_password()));
                hb.setPhone(req.getHbDetails().getHb_phno());

                hb.setRegNo(req.getHbDetails().getReg_no());
                hb.setGstNo(req.getHbDetails().getGst_no());
                hb.setType(req.getHbDetails().getType());

                // ✅ Link hospital → existing user
                hb.setUser(existingUser);

                // ✅ Save ONLY in HB_DETAILS
                HbDetails savedHb = hbDetailsRepo.save(hb);

                System.out.println("✅ Hospital/BloodBank saved successfully!");

                // ✅ GENERATE TOKEN FOR HOSPITAL somesh
                // ✅ GENERATE TOKEN FOR HOSPITAL (With Claims)
                Map<String, Object> claims = new HashMap<>();
                claims.put("name", savedHb.getName());
                claims.put("hbid", savedHb.getHbid());
                claims.put("rid", 3);

                String token = jwtUtil.generateToken(savedHb.getEmail(), claims);

                return new com.example.demo.DTO.AuthResponse(
                    token, 
                    0, // userid irrelevant for direct HB login usually
                    savedHb.getName(), // hbname as username
                    savedHb.getEmail(), 
                    3, // Role 3 = Hospital
                    savedHb.getHbid()
                );
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
        // ✅ Encode Password
        user.setPassword(passwordEncoder.encode(req.getPassword()));
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

        // ✅ GENERATE TOKEN FOR USER (Donor/Admin)
        // ✅ GENERATE TOKEN FOR USER (Donor/Admin) (With Claims)
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", savedUser.getFirstname());
        claims.put("userid", savedUser.getUserid());
        claims.put("rid", savedUser.getRole().getRid());

        String token = jwtUtil.generateToken(savedUser.getEmail(), claims);

        return new com.example.demo.DTO.AuthResponse(
            token, 
            savedUser.getUserid(), 
            savedUser.getFirstname(), // firstname as username
            savedUser.getEmail(), 
            savedUser.getRole().getRid(), 
            0 // hbid is 0 for regular users
        );
    }

    // ===========================
    // ✅ NEW: Separate Hospital Registration (Admin Only)
    // ===========================
    public Object registerHospital(com.example.demo.DTO.HbDetails reqHb, String adminEmail) {

        Users adminUser = userRepo.findByEmail(adminEmail);
        if (adminUser == null) {
            throw new RuntimeException("Admin User (Email: " + adminEmail + ") Not Found!");
        }

        HbDetails hb = new HbDetails();

        hb.setName(reqHb.getHb_name());
        hb.setEmail(reqHb.getHb_email());
        hb.setHb_password(passwordEncoder.encode(reqHb.getHb_password()));
        hb.setPhone(reqHb.getHb_phno());

        hb.setRegNo(reqHb.getReg_no());
        hb.setGstNo(reqHb.getGst_no());
        hb.setType(reqHb.getType());

        // ✅ Link hospital → Admin User
        hb.setUser(adminUser);

        HbDetails savedHb = hbDetailsRepo.save(hb);

        System.out.println("✅ Hospital/BloodBank registered by Admin: " + adminUser.getEmail());

        // ✅ Generate Token
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", savedHb.getName());
        claims.put("hbid", savedHb.getHbid());
        claims.put("rid", 3);

        String token = jwtUtil.generateToken(savedHb.getEmail(), claims);

        return new com.example.demo.DTO.AuthResponse(
            token, 
            0, 
            savedHb.getName(), 
            savedHb.getEmail(), 
            3, 
            savedHb.getHbid()
        );
    }

 // ===========================
 //  LOGIN METHOD (FINAL WORKING)
 // ===========================
 public Object loginUser(String email, String password) {

     // ===========================
     // Check USERS table first
     // ===========================
     Users user = userRepo.findByEmail(email);

     if (user != null) {

         if (!passwordEncoder.matches(password, user.getPassword())) {
             throw new RuntimeException("Invalid Password!");
         }

          // ✅ GENERATE TOKEN (With Claims)
          Map<String, Object> claims = new HashMap<>();
          claims.put("name", user.getFirstname());
          claims.put("userid", user.getUserid());
          claims.put("rid", user.getRole().getRid());

          String token = jwtUtil.generateToken(user.getEmail(), claims);
          
          return new com.example.demo.DTO.AuthResponse(
              token, 
              user.getUserid(), 
              user.getFirstname(), // firstname as username
              user.getEmail(), 
              user.getRole().getRid(), 
              0 // hbid is 0 for regular users
          );
     }

     // ===========================
     //  If not found → Check HB_DETAILS table
     // ===========================
     HbDetails hb = hbDetailsRepo.findByEmail(email);

     if (hb != null) {

         if (!passwordEncoder.matches(password, hb.getHb_password())) {
             throw new RuntimeException("Invalid Password!");
         }
         
         // ✅ GENERATE TOKEN (With Claims)
         Map<String, Object> claims = new HashMap<>();
         claims.put("name", hb.getName());
         claims.put("hbid", hb.getHbid());
         claims.put("rid", 3);

         String token = jwtUtil.generateToken(hb.getEmail(), claims);
         
         // ✅ Hospital/BloodBank role fixed rid=3
         return new com.example.demo.DTO.AuthResponse(
             token, 
             0, // userid might be 0 or irrelevant if logged in as hospital
             hb.getName(),
             hb.getEmail(), 
             3, 
             hb.getHbid()
         );
     }

     // ===========================
     //  Not found in both tables
     // ===========================
     throw new RuntimeException("User Not Found!");
 }
}
