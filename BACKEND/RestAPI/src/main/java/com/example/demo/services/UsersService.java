package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Users;
import com.example.demo.repositories.UsersRepository;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    // Register User
    public Users saveUser(Users user) {
        return usersRepository.save(user);
    }

    // Get All Users
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

//    //  Get User by ID
//    public Users getUserById(Integer id) {
//        Optional<Users> userOpt = usersRepository.findById(id);
//
//        if (userOpt.isPresent()) {
//            return userOpt.get();
//        } else {
//            throw new RuntimeException("User not found with id: " + id);
//        }
//    }
//
//    //  Update User
//    public Users updateUser(Integer id, Users updatedUser) {
//        Users existingUser = getUserById(id);
//
//        
//        existingUser.setFirstname(updatedUser.getFirstname());
//        existingUser.setLastname(updatedUser.getLastname());
//        existingUser.setEmail(updatedUser.getEmail());
//        existingUser.setPassword(updatedUser.getPassword());
//
//        return usersRepository.save(existingUser);
//    }
//
//    // Delete User
//    public void deleteUser(Integer id) {
//        usersRepository.deleteById(id);
//    }
}
