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

    private String hb_name;
    private String hb_email;
    private String hb_phno;
    private String reg_no;
    private String gst_no;
    private String type;

    @OneToOne
    @JoinColumn(name="uid")
    private Users user;
}
