package com.example.demo.entities;


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
@Table(name ="blood_response")
public class BloodResponse {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int resid;
	
	@ManyToOne
	@JoinColumn(name="brid")
	BloodRequest brid;
	
	byte[] comment;
	String status;
	
}
