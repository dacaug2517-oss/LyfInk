package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepository;

@RestController
	@RequestMapping("/api/roles")
	@CrossOrigin("*")
	public class RoleController {

	    @Autowired
	    private RoleRepository roleRepo;

	    @GetMapping("/all")
	    public List<Role> getAllRoles() {
	        return roleRepo.findAll();
	    }
	}
