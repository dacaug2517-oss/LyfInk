package com.example.demo.services;

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

    // ✅ Needed for Blood Component
    @Autowired BloodComponentRepository bloodComponentRepo;

    public Users register(RegisterRequest req) {

        Role role = roleRepo.findById(req.getRid()).orElseThrow();
        State state = stateRepo.findById(req.getStateid()).orElseThrow();
        City city = cityRepo.findById(req.getCityid()).orElseThrow();

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

        // ✅ Donor Registration
        if (req.getRid() == 1 && req.getDonorDetails() != null) {

            Donor donor = new Donor();
            donor.setDob(req.getDonorDetails().getDob());
            donor.setGender(req.getDonorDetails().getGender());
            donor.setMedical_history(req.getDonorDetails().getMedical_history());

            // ✅ Fetch BloodComponent Object using bcid
            BloodComponent bc =
                    bloodComponentRepo.findById(req.getDonorDetails().getBcid())
                    .orElseThrow(() -> new RuntimeException("Invalid Blood Component"));

            donor.setBloodComponent(bc);

            donor.setUser(user);
            user.setDonor(donor);
        }

        // ✅ Hospital Registration
        if (req.getRid() == 2 && req.getHbDetails() != null) {

            HbDetails hb = new HbDetails();
            hb.setHb_name(req.getHbDetails().getHb_name());
            hb.setHb_email(req.getHbDetails().getHb_email());
            hb.setHb_phno(req.getHbDetails().getHb_phno());
            hb.setReg_no(req.getHbDetails().getReg_no());
            hb.setGst_no(req.getHbDetails().getGst_no());
            hb.setType(req.getHbDetails().getType());

            hb.setUser(user);
            user.setHb(hb);
        }

        return userRepo.save(user);
    }
}
