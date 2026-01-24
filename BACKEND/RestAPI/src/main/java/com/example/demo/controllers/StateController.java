package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.State;
import com.example.demo.services.StateService;

@RestController
@RequestMapping("/api/states")
@CrossOrigin(origins = "*")
public class StateController {

    @Autowired
    private StateService stateService;

    // Fetch All States (For Dropdown)
    @GetMapping("/all")
    public ResponseEntity<List<State>> getAllStates() {

        List<State> states = stateService.getAllStates();

        return ResponseEntity.ok(states);
    }

    // Add New State (Optional)
    @PostMapping("/add")
    public ResponseEntity<State> addState(@RequestBody State state) {

        State savedState = stateService.saveState(state);

        return ResponseEntity.ok(savedState);
    }
}
