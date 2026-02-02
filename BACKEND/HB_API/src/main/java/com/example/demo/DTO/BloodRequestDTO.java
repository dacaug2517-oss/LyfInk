package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // ✅ Generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor // ✅ Default constructor (needed for Jackson)
@AllArgsConstructor // ✅ All-args constructor (optional)
public class BloodRequestDTO {

    private Integer userid=28;
    private Integer bcid;
    private Integer stateid;
    private Integer cityid;
    private Integer quantity;
    private String requiredby; // format: "yyyy-MM-dd"
    private String purpose;
    private String contact_no;
}
