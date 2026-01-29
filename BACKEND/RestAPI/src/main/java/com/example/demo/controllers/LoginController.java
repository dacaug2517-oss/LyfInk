package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Users;
import com.example.demo.services.UsersService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private UsersService usersService;

    // ✅ React will call this
    @PostMapping("/login")
    public Object login(@RequestBody Users user) {

        return usersService.loginUser(
                user.getEmail(),
                user.getPassword()
        );
    }
}
