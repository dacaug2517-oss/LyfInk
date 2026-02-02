//package com.example.demo.repositories;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import com.example.demo.entities.DonorDonations;
//
//@Repository
//public interface DonorDonationsRepository extends JpaRepository<DonorDonations, Integer> {
//
//    // Get all donations for a donor (by donorId)
//    List<DonorDonations> findByDidDid(Integer did);
//
//    // Get all donations ordered by latest first
//    List<DonorDonations> findByDidDidOrderByDonatedDateDesc(Integer did);
//}
package com.example.demo.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.DonorDonations;
import com.example.demo.entities.Donor;

public interface DonorDonationsRepository 
       extends JpaRepository<DonorDonations, Integer> {

	@Query("SELECT d FROM DonorDonations d WHERE d.did = :donor ORDER BY d.donated_date DESC")
    List<DonorDonations> findDonationsByDonor(@Param("donor") Donor donor);
}
