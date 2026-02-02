package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.City;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {

    // ✅ Fetch cities using sid (stateid)
    List<City> findByState_Stateid(int sid);
}