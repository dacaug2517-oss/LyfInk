package com.example.demo.repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.BloodStock;
import com.example.demo.entities.HbDetails;

@Repository
public interface BloodStockRepository extends JpaRepository<BloodStock, Integer> {
	@Query("SELECT new map(bc.bc_name as bcName, bs.ml as ml, bs.expiry_date as expiryDate) " +
		       "FROM BloodStock bs JOIN bs.bcid bc " +
		       "WHERE bs.hbid.hbid = :hbid")   // <-- note the .hbid
		List<Map<String, Object>> getBloodStockByHbid(@Param("hbid") Integer hbid);

}
