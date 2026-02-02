package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.HBDetails;
import com.example.demo.services.HbDetailsService;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin("*")
public class HbDetailsController {

    @Autowired
    private HbDetailsService hbDetailsService;

    @GetMapping("/by-email/{email}")
    public HBDetails getByEmail(@PathVariable String email) {
        return hbDetailsService.getByEmail(email);
    }
}
