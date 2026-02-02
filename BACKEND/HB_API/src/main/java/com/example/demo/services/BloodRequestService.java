package com.example.demo.services;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.BloodRequestDTO;
import com.example.demo.entities.BloodComponent;
import com.example.demo.entities.BloodRequest;
import com.example.demo.repositories.BloodComponentRepository;
import com.example.demo.repositories.BloodRequestRepository;
import com.example.demo.repositories.CityRepository;
import com.example.demo.repositories.StateRepository;
import com.example.demo.repositories.UsersRepository;

@Service
public class BloodRequestService {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private BloodComponentRepository bloodComponentRepository;

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    public List<Map<String, Object>> getRequestedBlood() {

        List<Object[]> data = bloodRequestRepository.getRequestedBlood();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : data) {

            String bloodType = (String) row[0];
            Integer quantity = (Integer) row[1];

            int safeQty = quantity != null ? quantity : 0;
            String status = safeQty >= 5 ? "HIGH" : "LOW";

            Map<String, Object> map = new HashMap<>();
            map.put("type", bloodType);
            map.put("count", safeQty);
            map.put("status", status);

            result.add(map);
        }

        return result;
    }

    public List<BloodRequest> getAllRequest() {
        return bloodRequestRepository.findAll();
    }

    // ✅ FIXED SAVE METHOD
    public BloodRequest saveRequest(BloodRequestDTO dto) {

        // 🔒 VALIDATIONS (VERY IMPORTANT)
        if (dto.getUserid() == null) {
            throw new RuntimeException("userid is required");
        }
        if (dto.getBcid() == null) {
            throw new RuntimeException("bcid is required");
        }
        if (dto.getStateid() == null) {
            throw new RuntimeException("stateid is required");
        }
        if (dto.getCityid() == null) {
            throw new RuntimeException("cityid is required");
        }

        BloodRequest br = new BloodRequest();

        // ✅ SAFE findById (NO NULL POSSIBLE NOW)
        br.setUserid(
            userRepository.findById(dto.getUserid())
                .orElseThrow(() -> new RuntimeException("User not found"))
        );

        br.setBcid(
            bloodComponentRepository.findById(dto.getBcid())
                .orElseThrow(() -> new RuntimeException("Blood component not found"))
        );

        br.setStateid(
            stateRepository.findById(dto.getStateid())
                .orElseThrow(() -> new RuntimeException("State not found"))
        );

        br.setCityid(
            cityRepository.findById(dto.getCityid())
                .orElseThrow(() -> new RuntimeException("City not found"))
        );

        br.setQuantity(dto.getQuantity());

        if (dto.getRequiredby() != null) {
            br.setRequiredby(Date.valueOf(dto.getRequiredby()));
        }

        br.setPurpose(dto.getPurpose());
        br.setContact_no(dto.getContact_no());
        br.setRequest_date(new Date(System.currentTimeMillis()));

        // ❗ brid is AUTO-GENERATED — DO NOT TOUCH IT
        return bloodRequestRepository.save(br);
    }
    
    
 

    public List<BloodRequest> getAllRequestsExceptCurrentUser(int userid) {
        return bloodRequestRepository.findAllExceptUser(userid);
    }

	public List<BloodRequest> getRequestsCreatedByUser(int userid) {
		// TODO Auto-generated method stub
		return null;
	}

}
