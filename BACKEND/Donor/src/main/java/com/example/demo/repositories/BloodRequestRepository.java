package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.dto.BloodRequestHospitalDTO;
import com.example.demo.entities.BloodRequest;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Integer> {

	@Query("""
			SELECT new com.example.demo.dto.BloodRequestHospitalDTO(
			    r.brid,
			    r.quantity,
			    r.bcid.bc_name,
			    hb.hb_name,
			    hb.hb_email,
			    hb.hb_phno,
			    r.cityid.cityname
			)
			FROM BloodRequest r
			JOIN r.hospital hb
			WHERE r.bcid.bcid = :bcid
			""")
			List<BloodRequestHospitalDTO> findRequestsWithHospital(@Param("bcid") int bcid);


}

