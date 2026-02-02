package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.HbDetails;
import com.example.demo.entities.Users;
import com.example.demo.repositories.HbDetailsRepository;
import com.example.demo.repositories.UsersRepository;

@RestController
@RequestMapping("/api/hb")
@CrossOrigin(origins = "http://localhost:3000")
public class HbDetailsController {

    @Autowired
    private HbDetailsRepository hbRepo;

    @Autowired
    private UsersRepository userRepo;

    @PostMapping("/register")
    public HbDetails registerHospital(@RequestBody HbDetails hb) {

        // ✅ If UID is provided
        if (hb.getUser() != null && hb.getUser().getUserid() != 0) {

            int uid = hb.getUser().getUserid();

            // ✅ Fetch proper Users object
            Users adminUser = userRepo.findById(uid)
                    .orElseThrow(() -> new RuntimeException("UID not found in users table"));

            // ✅ Attach full user entity
            hb.setUser(adminUser);
        }

        // ✅ Now Save Hospital
        return hbRepo.save(hb);
    }
}



