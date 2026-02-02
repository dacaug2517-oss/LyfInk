package com.example.demo.entities;


import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
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
@Table(name ="donation_camp")
public class DonationCamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cid")
    int cid;

    @ManyToOne
    @JoinColumn(name="hbid")
    HBDetails hbid;

    @Column(name="camp_name")
    String camp_name;

    @Column(name="venue")
    String venue;

    @Column(name="date")
    Date date;

    @Column(name="from_time")
    Time from_time;

    @Column(name="to_time")
    Time to_time;

    @Column(name="contact_person")
    String contact_person;

    @Column(name="address")
    String address;

    @ManyToOne
    @JoinColumn(name="stateid")
    State stateid;

    @ManyToOne
    @JoinColumn(name="cityid")
    City cityid;
}
