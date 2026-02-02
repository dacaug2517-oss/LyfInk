package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.RegisterRequest;
import com.example.demo.entities.Users;
import com.example.demo.services.UsersService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UsersController {

    @Autowired
    UsersService usersService;

    @PostMapping("/register")
    public Object register(@RequestBody RegisterRequest req) {
        return usersService.register(req);
    }

    // ✅ New Endpoint for Admin to Register Hospital
    // Token is automatically decoded by Spring Security, providing the Admin's email in 'principal'
    @PostMapping("/register-hospital")
    public Object registerHospital(@RequestBody com.example.demo.DTO.HbDetails hbDetails, java.security.Principal principal) {
        return usersService.registerHospital(hbDetails, principal.getName());
    }
}
