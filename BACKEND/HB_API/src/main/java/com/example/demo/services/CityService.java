package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.City;
import com.example.demo.repositories.CityRepository;

@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    // Get all cities by sid
    public List<City> getCitiesByStateId(int sid) {
        return cityRepository.findByState_Stateid(sid);
    }
}