package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BloodRequestHospitalDTO {

    private int brid;
    private int quantity;
    private String bloodGroup;

    private String hospitalName;
    private String hospitalEmail;
    private long hospitalPhone;

    private String city;

    // ✅ ADD THIS MANUALLY (Hibernate needs exact constructor)
    public BloodRequestHospitalDTO(
            int brid,
            int quantity,
            String bloodGroup,
            String hospitalName,
            String hospitalEmail,
            long hospitalPhone,
            String city
    ) {
        this.brid = brid;
        this.quantity = quantity;
        this.bloodGroup = bloodGroup;
        this.hospitalName = hospitalName;
        this.hospitalEmail = hospitalEmail;
        this.hospitalPhone = hospitalPhone;
        this.city = city;
    }
}
