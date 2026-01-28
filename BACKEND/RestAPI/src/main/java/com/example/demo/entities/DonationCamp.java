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
@Table(name ="donation_camp")
public class DonationCamp {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int cid;
	
	@ManyToOne
	@JoinColumn(name="hbid")
	HbDetails hbid;
	
	String camp_name;
	String venue;
	Date date;
	Date from_time;
	Date to_time;
	String contact_person;
	String address;
	
	@ManyToOne
	@JoinColumn(name="stateid")
	State stateid;
	
	@ManyToOne
	@JoinColumn(name="cityid")
	City cityid;
}
