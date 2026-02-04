package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.BloodRequestHospitalDTO;
import com.example.demo.repositories.BloodRequestRepository;

@Service
public class BloodRequestService {

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    // ✅ Fetch Requests With Hospital Details Using BCID
    public List<BloodRequestHospitalDTO> getRequestsWithHospital(int bcid) {
        return bloodRequestRepository.findRequestsWithHospital(bcid);
    }
}
