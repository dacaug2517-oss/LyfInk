package com.example.demo.entities;

import java.sql.Date;



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
@Table(name ="donor")
public class Donor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer did;
	
	@ManyToOne
	@JoinColumn(name="uid")
	Users uid;
	
	//@NotNull(message = "Date of birth is required")
    @Column(name = "dob")
	Date dob;
	
    //@NotBlank(message = "Gender is required")
	@Column(name = "gender")
	String gender;
	
	@ManyToOne
	@JoinColumn(name="bcid")
	private BloodComponent bcid;
	

    @Column(name = "medical_history")
	String medical_history;
}
