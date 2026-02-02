package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.services.BloodStockService;

@RestController
@RequestMapping("/api/request")
@CrossOrigin(origins = "http://localhost:3000")
public class BloodStockController {

    @Autowired
    private BloodStockService bloodStockService;

    // GET stock by hbid
    @GetMapping("/stock-details/{hbid}")
    public List<Map<String, Object>> getBloodStockByHbid(@PathVariable Integer hbid) {
        return bloodStockService.getBloodStockByHbid(hbid);
    }
}



