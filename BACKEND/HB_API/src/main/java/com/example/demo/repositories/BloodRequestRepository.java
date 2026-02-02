package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.BloodRequest;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Integer> {

    @Query("""
        SELECT r.bcid.bc_name, COALESCE(r.quantity, 0)
        FROM BloodRequest r
    """)
    List<Object[]> getRequestedBlood();
    

  

        @Query("SELECT br FROM BloodRequest br WHERE br.userid.userid <> :userid")
        List<BloodRequest> findAllExceptUser(@Param("userid") int userid);


}