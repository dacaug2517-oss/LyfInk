////package com.example.demo.repositories;
////
////import java.util.List;
////
////import org.springframework.data.jpa.repository.JpaRepository;
////import org.springframework.stereotype.Repository;
////
////import com.example.demo.entities.DonorDonations;
////
////@Repository
////public interface DonorDonationsRepository extends JpaRepository<DonorDonations, Integer> {
////
////    // Get all donations for a donor (by donorId)
////    List<DonorDonations> findByDidDid(Integer did);
////
////    // Get all donations ordered by latest first
////    List<DonorDonations> findByDidDidOrderByDonatedDateDesc(Integer did);
////}
//package com.example.demo.repositories;
//
//import java.util.List;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import com.example.demo.entities.DonorDonations;
//import com.example.demo.entities.Donor;
//
//@Repository
//public interface DonorDonationsRepository
//        extends JpaRepository<DonorDonations, Integer> {
//
//    List<DonorDonations> findByDid_DidOrderByDonated_dateDesc(int did);
//}
//
//
