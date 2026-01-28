package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "blood_component")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BloodComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bcid;

    private String bc_name;

    private int category;
}
