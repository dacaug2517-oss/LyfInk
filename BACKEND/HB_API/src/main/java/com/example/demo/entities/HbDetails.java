package com.example.demo.entities;

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

    // ✅ hb_name column
    @Column(name="hb_name")
    private String hb_name;

    // ✅ hb_email column
    @Column(name="hb_email")
    private String hb_email;

    // ✅ hb_password column
    @Column(name="hb_password")
    private String hb_password;

    // ✅ hb_phno column
    @Column(name="hb_phno")
    private String hb_phno;

    // ✅ reg_no column
    @Column(name="reg_no")
    private String reg_no;

    // ✅ gst_no column
    @Column(name="gst_no")
    private String gst_no;

    // ✅ type column
    @Column(name="type")
    private String type;

    // ✅ uid column (Admin/User who registered hospital)
    @ManyToOne
    @JoinColumn(name="uid")
    private Users user;
}
