package com.example.demo.services;

import com.example.demo.entities.Users;
import com.example.demo.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository repository;

    @Autowired
    private com.example.demo.repositories.HbDetailsRepository hbDetailsRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = repository.findByEmail(email);
        if (user != null) {
             return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
        }

        com.example.demo.entities.HbDetails hb = hbDetailsRepo.findByEmail(email);
        if (hb != null) {
            // Using hb_password
            return new org.springframework.security.core.userdetails.User(hb.getEmail(), hb.getHb_password(), new ArrayList<>());
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
