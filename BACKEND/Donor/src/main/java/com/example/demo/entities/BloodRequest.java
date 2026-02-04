package com.example.demo.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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

    // ✅ User Mapping
    @ManyToOne
    @JoinColumn(name="uid")
    private Users uid;

    // ✅ Blood Component Mapping
    @ManyToOne
    @JoinColumn(name="bcid")
    private BloodComponent bcid;

    private int quantity;

    private Date request_date;
    private Date requiredby;
    private String purpose;
    private String contact_no;

    // ✅ State Mapping
    @ManyToOne
    @JoinColumn(name="stateid")
    private State stateid;

    // ✅ City Mapping
    @ManyToOne
    @JoinColumn(name="cityid")
    private City cityid;

    // ✅ Hospital/BloodBank Mapping (NEW)
    @ManyToOne
    @JoinColumn(name="hbid")   // FK column in blood_request table
    private HBDetails hospital;
}
