package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Users;
import com.example.demo.services.UsersService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") 
public class UsersController {

    @Autowired
    private UsersService usersService;

     //Register User
    @PostMapping("/register")
    public ResponseEntity<Users> registerUser(@RequestBody Users user) {
        Users savedUser = usersService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    // Get All Users
    @GetMapping("/getall")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = usersService.getAllUsers();
        return ResponseEntity.ok(users);
    }

//    // 3️ Get User by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Users> getUserById(@PathVariable Integer id) {
//        Users user = usersService.getUserById(id);
//        return ResponseEntity.ok(user);
//    }
//
//    // Update User
//    @PutMapping("/{id}")
//    public ResponseEntity<Users> updateUser(
//            @PathVariable Integer id,
//            @RequestBody Users user) {
//
//        Users updatedUser = usersService.updateUser(id, user);
//        return ResponseEntity.ok(updatedUser);
//    }
//
//    // Delete User
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
//        usersService.deleteUser(id);
//        return ResponseEntity.ok("User deleted successfully");
//    }
}