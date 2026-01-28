package com.example.demo.entities;

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
    private String mobno;
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

    // ✅ Donor Table Mapping
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Donor donor;

    // ✅ HbDetails Table Mapping
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private HbDetails hb;
}
