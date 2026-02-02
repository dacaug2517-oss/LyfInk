package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.BloodRequest;
//
//@Repository
//public interface BloodRequestRepository extends JpaRepository<BloodRequest, Integer> {
//
//    @Query("""
//        SELECT r.bcid.bc_name, COALESCE(r.quantity, 0)
//        FROM BloodRequest r
//    """)
//    List<Object[]> getRequestedBlood();
//    List<BloodRequest> findByBcid_Bc_name(String name);
//
//
//}
@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Integer> {

    @Query("""
        SELECT r.bcid.bc_name, COALESCE(r.quantity, 0)
        FROM BloodRequest r
    """)
    List<Object[]> getRequestedBlood();

    @Query("SELECT r FROM BloodRequest r WHERE r.bcid.bc_name = :name")
    List<BloodRequest> findByBloodGroup(@Param("name") String name);
}
