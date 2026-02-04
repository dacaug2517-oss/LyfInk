package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // ✅ Generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor // ✅ Default constructor (needed for Jackson)
@AllArgsConstructor // ✅ All-args constructor (optional)
public class BloodRequestDTO {

    private int bcid;
    private int quantity;
    private String urgency;
    private String purpose;
    private String requiredby;
    private String contact_no;

    private int stateid;
    private int cityid;

    // ✅ Manually passed
    private int userid;
    private int hbid;

    // getters/setters
}

