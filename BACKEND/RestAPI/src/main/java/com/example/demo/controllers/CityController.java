package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.City;
import com.example.demo.services.CityService;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "*")
public class CityController {

    @Autowired
    private CityService cityService;

    // Fetch cities by sid
    @GetMapping("/bystate/{sid}")
    public List<City> getCitiesByState(@PathVariable int sid) {
        return cityService.getCitiesByStateId(sid);
    }
}