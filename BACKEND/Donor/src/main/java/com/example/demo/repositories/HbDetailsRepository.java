package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.HBDetails;

@Repository
public interface HbDetailsRepository extends JpaRepository<HBDetails, Integer> {

	 @Query("SELECT h FROM HBDetails h WHERE h.hb_email = :email")
	    HBDetails findByEmail(@Param("email") String email);
}