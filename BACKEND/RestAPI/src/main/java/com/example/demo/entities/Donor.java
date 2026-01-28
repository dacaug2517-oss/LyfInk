package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Donor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer did;

    private String dob;
    private String gender;
    private String medical_history;

    // ✅ Correct Foreign Key Mapping
    @ManyToOne
    @JoinColumn(name = "bcid", nullable = false)
    private BloodComponent bloodComponent;

    @OneToOne
    @JoinColumn(name = "uid")
    private Users user;
}
