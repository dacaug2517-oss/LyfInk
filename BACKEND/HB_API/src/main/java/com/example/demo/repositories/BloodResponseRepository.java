package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.BloodResponse;

@Repository
public interface BloodResponseRepository extends JpaRepository<BloodResponse, Integer> {

    // Get all responses for requests created by a particular user
    @Query("""
        SELECT br
        FROM BloodResponse br
        WHERE br.brid.userid.userid = :userid
    """)
    List<BloodResponse> findResponsesForRequestsCreatedByUser(@Param("userid") int userid);
}
