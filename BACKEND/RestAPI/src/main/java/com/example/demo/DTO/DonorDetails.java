package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DonorDetails {

    private String dob;
    private String gender;
    private String medical_history;

    // ✅ Added for Blood Component Dropdown
    private Integer bcid;
}
