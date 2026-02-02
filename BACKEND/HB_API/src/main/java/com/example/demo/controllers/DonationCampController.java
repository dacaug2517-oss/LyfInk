package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.DonationCampRequestDTO;
import com.example.demo.entities.*;
import com.example.demo.services.DonationCampService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/donation-camp")
public class DonationCampController {

    @Autowired
    private DonationCampService service;

    @PostMapping("/save")
    public DonationCamp saveDonationCamp(@RequestBody DonationCampRequestDTO dto) {

        DonationCamp camp = new DonationCamp();

        camp.setCamp_name(dto.getCamp_name());
        camp.setVenue(dto.getVenue());
        camp.setDate(dto.getDate());
        camp.setFrom_time(dto.getFrom_time());
        camp.setTo_time(dto.getTo_time());
        camp.setContact_person(dto.getContact_person());
        camp.setAddress(dto.getAddress());

        HbDetails hb = new HbDetails();
        hb.setHbid(dto.getHbid());
        camp.setHbid(hb);

        State state = new State();
        state.setStateid(dto.getStateid());
        camp.setStateid(state);

        City city = new City();
        city.setCityid(dto.getCityid());
        camp.setCityid(city);

        return service.saveDonationCamp(camp);
    }
}
