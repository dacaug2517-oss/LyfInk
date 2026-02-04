package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.BloodRequest;
import com.example.demo.DTO.BloodRequestFullDTO;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Integer> {

    // ✅ Show all requests except current hospital's own requests
    @Query("""
        SELECT br
        FROM BloodRequest br
        WHERE br.hbid.hbid <> :hbid
    """)
    List<BloodRequest> findAllExceptHospital(@Param("hbid") int hbid);

    // ✅ Fetch blood requests NOT created by this user
    @Query("""
        SELECT br
        FROM BloodRequest br
        WHERE br.userid.userid <> :userid
    """)
    List<BloodRequest> findAllExceptUser(@Param("userid") int userid);

    // ✅ Requested blood summary (Used in BloodResponseService)
    @Query("""
        SELECT br.bcid.bc_name, COALESCE(SUM(br.quantity),0)
        FROM BloodRequest br
        GROUP BY br.bcid.bc_name
    """)
    List<Object[]> getRequestedBlood();
    
    @Query(value = """
            SELECT 
    		    br.brid,
                br.quantity,
                br.contact_no,
                hb.hb_name,
                hb.hb_email,
                c.cityname,
                s.statename,
                bc.bc_name
            FROM blood_request br
            JOIN hb_details hb ON br.hbid = hb.hbid
            JOIN city c ON br.cityid = c.cityid
            JOIN state s ON br.stateid = s.stateid
            JOIN blood_component bc ON br.bcid = bc.bcid
            WHERE br.hbid != :hbid
        """, nativeQuery = true)
        List<Object[]> getFullRequestDetailsRaw(int hbid);
}
