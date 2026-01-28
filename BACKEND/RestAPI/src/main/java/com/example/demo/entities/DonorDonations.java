package com.example.demo.entities;

import java.sql.Date;

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
@Table(name ="donor_donations")
public class DonorDonations {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int ddid;
	
	@ManyToOne
	@JoinColumn(name="did")
	Donor did;
	
	
	Date donated_date;
	
	@ManyToOne
	@JoinColumn(name="hbid")
	HbDetails hbid;
	
	int units;
}
