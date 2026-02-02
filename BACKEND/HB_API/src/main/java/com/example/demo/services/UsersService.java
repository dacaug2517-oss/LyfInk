package com.example.demo.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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
    

}