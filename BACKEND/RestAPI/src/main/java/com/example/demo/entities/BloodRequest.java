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
@Table(name ="blood_request")

public class BloodRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int brid;
	
	@ManyToOne
	@JoinColumn(name="userid")
	Users userid;
	
	@ManyToOne
	@JoinColumn(name="bcid")
	BloodComponent bcid;
	
	
	int quantity;
	
	Date request_date;
	Date requiredby;
	String purpose;
	String contact_no;
	
	@ManyToOne
	@JoinColumn(name="stateid")
	State stateid;
	
	@ManyToOne
	@JoinColumn(name="cityid")
	City cityid;
}
