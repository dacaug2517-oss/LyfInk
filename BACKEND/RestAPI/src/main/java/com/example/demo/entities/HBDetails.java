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
@Table(name ="hb_details")
public class HBDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int hbid;
	String hb_name;
	String hb_email;
	long hb_phno;
	String reg_no;
	String gst_no;
	
	@ManyToOne
	@JoinColumn(name="uid")
	Users uid;
	
	int type;
}
