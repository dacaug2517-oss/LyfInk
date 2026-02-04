//package com.example.demo.services;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.example.demo.dto.DonationHistoryDTO;
//import com.example.demo.entities.Donor;
//import com.example.demo.entities.DonorDonations;
//import com.example.demo.repositories.DonorDonationsRepository;
//import com.example.demo.repositories.DonorRepository;
//@Service
//public class DonorDonationService {
//
//    @Autowired
//    private DonorDonationsRepository repo;
//
//    public List<DonorDonations> getDonationHistory(int did) {
//        return repo.findByDid_DidOrderByDonated_dateDesc(did);
//    }
//}
//
//
//
