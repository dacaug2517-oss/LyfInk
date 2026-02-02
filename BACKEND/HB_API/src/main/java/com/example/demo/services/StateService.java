package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.State;
import com.example.demo.repositories.StateRepository;

@Service
public class StateService {

    @Autowired
    private StateRepository stateRepository;

    // Get All States
    public List<State> getAllStates() {
        return stateRepository.findAll();
    }

    // Save State (Optional)
    public State saveState(State state) {
        return stateRepository.save(state);
    }
}