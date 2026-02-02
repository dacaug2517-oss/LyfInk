package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Donor;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Integer>{
	@Query("SELECT d FROM Donor d WHERE d.uid.userid = :userid")
	List<Donor> findByUserId(Integer userid);
	 // Find donor by user's email
    Optional<Donor> findByUidEmail(String email);
}
