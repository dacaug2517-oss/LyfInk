package com.example.demo.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Users;
import com.example.demo.services.UsersService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UsersService usersService;

    // ✅ LOGIN API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {

        String email = data.get("email");
        String password = data.get("password");

        // ✅ Check in DB
        Users user = usersService.loginUser(email, password);

        // ❌ Invalid Credentials
        if (user == null) {
            return ResponseEntity.status(401)
                    .body("Invalid Email or Password");
        }

        // ✅ Login Success
        return ResponseEntity.ok(user);
    }
}
