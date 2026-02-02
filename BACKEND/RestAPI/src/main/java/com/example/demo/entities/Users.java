package com.example.demo.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="users")
@Getter
@Setter
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userid;

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private long mobno;
    private String address;

    private String security_question;
    private String security_answer;

    // ✅ Role Mapping
    @ManyToOne
    @JoinColumn(name="rid")
    private Role role;

    // ✅ State Mapping
    @ManyToOne
    @JoinColumn(name="stateid")
    private State state;

    // ✅ City Mapping
    @ManyToOne
    @JoinColumn(name="cityid")
    private City city;

    // ✅ Donor Table Mapping (One user = One donor)
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Donor donor;

    // ✅ HbDetails Mapping (One user = Many hospitals)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<HbDetails> hospitals = new ArrayList<>();

}
