package com.example.demo.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.demo.repositories.BloodStockRepository;

@Service
public class BloodStockService {

    @Autowired
    private BloodStockRepository bloodStockRepository;

    public List<Map<String, Object>> getBloodStockByHbid(Integer hbid) {
        return bloodStockRepository.getBloodStockByHbid(hbid);
    }
}



