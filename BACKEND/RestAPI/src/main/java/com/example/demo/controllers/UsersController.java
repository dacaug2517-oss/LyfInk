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
    private UsersService service;

    @PostMapping("/register")
    public Users register(@RequestBody RegisterRequest req) {

        return service.register(req);
    }
}
