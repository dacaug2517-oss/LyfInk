package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.DonationHistoryDTO;
import com.example.demo.entities.Donor;
import com.example.demo.entities.DonorDonations;
import com.example.demo.repositories.DonorDonationsRepository;
import com.example.demo.repositories.DonorRepository;

//@Service
//public class DonorDonationsService {
//
//    @Autowired
//    private DonorDonationsRepository donorDonationsRepository;
//
//    @Autowired
//    private DonorRepository donorRepository;
//
//    @Autowired
//    private HBDetailsRepository hbDetailsRepository;
//
//    // Add a new donation entry
//    public DonorDonations addDonation(Integer donorId, DonorDonations donation) {
//
//        Donor donor = donorRepository.findById(donorId)
//            .orElseThrow(() -> new RuntimeException("Donor not found"));
//
//        HBDetails hb = hbDetailsRepository.findById(
//                donation.getHbid().getHbid())
//            .orElseThrow(() -> new RuntimeException("Blood bank not found"));
//
//        donation.setDid(donor);
//        donation.setHbid(hb);
//
//        return donorDonationsRepository.save(donation);
//    }
//
//    // Get all donations for a donor
//    public List<DonorDonations> getDonationsByDonorId(Integer donorId) {
//
//        return donorDonationsRepository.findByDidDidOrderByDonatedDateDesc(donorId);
//    }
//
//    // Get a donation by donationId
//    public DonorDonations getDonationById(Integer donationId) {
//
//        return donorDonationsRepository.findById(donationId)
//            .orElseThrow(() -> new RuntimeException("Donation record not found"));
//    }
//
//    // Delete a donation record (admin/staff use)
//    public void deleteDonation(Integer donationId) {
//
//        donorDonationsRepository.deleteById(donationId);
//    }
//}

@Service
public class DonorDonationsService {

    @Autowired
    private DonorDonationsRepository donorDonationsRepository;

    @Autowired
    private DonorRepository donorRepository;

//    // Get donation history using Users.email
//    public List<DonationHistoryDTO> getDonationHistory(String email) {
//
//        Donor donor = donorRepository.findByUidEmail(email)
//                .orElseThrow(() -> new RuntimeException("Donor not found"));
//
//        List<DonorDonations> donations =
//        		donorDonationsRepository.findDonationsByDonor(donor);
//
//
//        return donations.stream().map(d ->
//                new DonationHistoryDTO(
//                        d.getDonated_date(),
//                        d.getHbid().getHb_name(),
//                        d.getDid().getBcid().getBc_name(),   // fetch from BloodComponent
//                        "Completed"
//                )
//        ).toList();
//    }
//}
    public List<DonationHistoryDTO> getDonationHistoryById(Integer donorId) {

        // 1️⃣ Find donor
        Donor donor = donorRepository.findById(donorId)
                .orElseThrow(() -> new RuntimeException("Donor not found"));

        // 2️⃣ Get donations
        List<DonorDonations> donations =
                donorDonationsRepository.findDonationsByDonor(donor);

        // 3️⃣ Convert to DTO
        return donations.stream().map(d ->
                new DonationHistoryDTO(
                        d.getDonated_date(),
                        d.getHbid().getHb_name(),
                        d.getDid().getBcid().getBc_name(),
                        "Completed"
                )
        ).toList();
    }
}