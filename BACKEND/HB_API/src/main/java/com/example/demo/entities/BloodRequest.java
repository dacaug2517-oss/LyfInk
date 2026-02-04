package com.example.demo.entities;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

@Entity
@Table(name ="blood_request")
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int brid;

    // ✅ User who created request
    @ManyToOne
    @JoinColumn(name="uid")
    private Users userid;

    // ✅ Blood Component
    @ManyToOne
    @JoinColumn(name="bcid")
    private BloodComponent bcid;

    private int quantity;

    private Date request_date;
    private Date requiredby;

    private String purpose;
    private String contact_no;

    @ManyToOne
    @JoinColumn(name="stateid")
    private State stateid;

    @ManyToOne
    @JoinColumn(name="cityid")
    private City cityid;

    // ✅ NEW: Hospital ID Auto Saved
    @ManyToOne
    @JoinColumn(name="hbid")
    private HbDetails hbid;
}
