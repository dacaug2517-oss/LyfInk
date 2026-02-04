package com.example.demo.entities;

import java.time.LocalDateTime;

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
@Table(name ="users")
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer userid;
	String password;
	String firstname;
	String lastname;
	
	@Column(unique = true)
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
	LocalDateTime created_at;
	
}
