
package com.example.demo.entities;

import java.util.Optional;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="hb_details")
@Getter
@Setter
public class HbDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int hbid;

    @Column(name="hb_name")
    private String name;

    @Column(name="hb_email")
    private String email;

    private String hb_password;

    @Column(name="hb_phno")
    private String phone;

    @Column(name="reg_no")
    private String regNo;

    @Column(name="gst_no")
    private String gstNo;

    private String type;

    // ✅ Admin who registered this hospital
    @ManyToOne
    @JoinColumn(name="uid")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Users user;
    
    
    
}

