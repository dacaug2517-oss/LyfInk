package com.example.demo.entities;

import java.sql.Date;
import java.sql.Time;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "donation_camp")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class DonationCamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;

    @ManyToOne
    @JoinColumn(name = "hbid", nullable = false)
    private HbDetails hbid;

    private String camp_name;
    private String venue;

    private Date date;
    private Time from_time;
    private Time to_time;

    private String contact_person;
    private String address;

    @ManyToOne
    @JoinColumn(name = "stateid", nullable = false)
    private State stateid;

    @ManyToOne
    @JoinColumn(name = "cityid", nullable = false)
    private City cityid;
}
