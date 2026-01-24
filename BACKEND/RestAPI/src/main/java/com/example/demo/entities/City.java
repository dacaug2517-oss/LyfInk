package com.example.demo.entities;

import jakarta.persistence.*;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

@Entity
@Table(name = "city")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cityid;

    private String cityname;

    // Foreign Key Column = sid
    @ManyToOne
    @JoinColumn(name = "sid")  
    private State state;
}
