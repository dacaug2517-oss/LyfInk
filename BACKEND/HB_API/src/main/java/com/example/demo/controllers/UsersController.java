package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import com.example.demo.entities.Users;
import com.example.demo.services.UsersService;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    UsersService usersService;

  
}
