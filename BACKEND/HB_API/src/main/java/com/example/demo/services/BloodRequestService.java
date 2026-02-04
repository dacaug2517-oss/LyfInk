package com.example.demo.services;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.BloodRequestDTO;
import com.example.demo.entities.BloodRequest;
import com.example.demo.entities.HbDetails;
import com.example.demo.entities.Users;
import com.example.demo.repositories.BloodComponentRepository;
import com.example.demo.repositories.BloodRequestRepository;
import com.example.demo.repositories.CityRepository;
import com.example.demo.repositories.StateRepository;

import com.example.demo.DTO.BloodRequestFullDTO;
import com.example.demo.repositories.BloodRequestRepository;

@Service
public class BloodRequestService {


    @Autowired
    private BloodRequestRepository repo;
    
    @Autowired
    private BloodComponentRepository bloodComponentRepository;

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    // ✅ SAVE REQUEST WITHOUT JWT
    public BloodRequest saveRequest(BloodRequestDTO dto) {

        BloodRequest br = new BloodRequest();

        // ✅ STEP 5: Set User manually
        Users user = new Users();
        user.setUserid(dto.getUserid());
        br.setUserid(user);

        // ✅ STEP 5: Set Hospital manually
        HbDetails hospital = new HbDetails();
        hospital.setHbid(dto.getHbid());
        br.setHbid(hospital);

        // Blood Component
        br.setBcid(
                bloodComponentRepository.findById(dto.getBcid())
                        .orElseThrow(() -> new RuntimeException("Blood Component not found"))
        );

        // State
        br.setStateid(
                stateRepository.findById(dto.getStateid())
                        .orElseThrow(() -> new RuntimeException("State not found"))
        );

        // City
        br.setCityid(
                cityRepository.findById(dto.getCityid())
                        .orElseThrow(() -> new RuntimeException("City not found"))
        );

        // Other Fields
        br.setQuantity(dto.getQuantity());
        br.setPurpose(dto.getPurpose());
        br.setContact_no(dto.getContact_no());

        if (dto.getRequiredby() != null) {
            br.setRequiredby(Date.valueOf(dto.getRequiredby()));
        }

        br.setRequest_date(new Date(System.currentTimeMillis()));

        return bloodRequestRepository.save(br);
    }


    // ✅ Show all requests (no filtering)
    public List<BloodRequest> getAllRequests() {
        return bloodRequestRepository.findAll();
    }
    
    public List<BloodRequestFullDTO> getFullDetails(int hbid) {

        List<Object[]> rows = repo.getFullRequestDetailsRaw(hbid);

        List<BloodRequestFullDTO> result = new ArrayList<>();

        for (Object[] row : rows) {

            BloodRequestFullDTO dto = new BloodRequestFullDTO(
            		(int) row[0],       // brid
                    (int) row[1],       // quantity
                    (String) row[2],    // contact_no
                    (String) row[3],    // hb_name
                    (String) row[4],    // hb_email
                    (String) row[5],    // cityname
                    (String) row[6],   // statename
                    (String) row[7]        // bc_name
            );

            result.add(dto);
        }

        return result;
    }
}
