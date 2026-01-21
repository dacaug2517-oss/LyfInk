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
@Table(name ="users")
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int userid;
	String password;
	String firstname;
	String lastname;
	String email;
	long mobno;
	String address;
	
	@ManyToOne
	@JoinColumn(name="stateid")
	State stateid;
	
	@ManyToOne
	@JoinColumn(name="cityid")
	City cityid;
	
	@ManyToOne
	@JoinColumn(name="rid")
	Role rid;
	String security_question;
	String security_answer;
	Date created_at;
	
}
