package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.BloodResponse;
import com.example.demo.services.BloodResponseService;

@RestController
@RequestMapping("/api/response")
@CrossOrigin
public class BloodResponseController {

    @Autowired
    private BloodResponseService service;

    @PostMapping("/data")
    public BloodResponse addResponse(@RequestBody BloodResponse response) {
        return service.save(response);
    }
}
