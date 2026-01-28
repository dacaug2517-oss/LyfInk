package com.example.demo.DTO;

import lombok.Data;

@Data
public class UserRegisterDTO {

    public String firstname;
    public String lastname;
    public String email;
    public String password;
    public String mobno;
    public String address;

    public Integer rid;
    public Integer stateid;
    public Integer cityid;

    public String security_question;
    public String security_answer;

    public DonorDetails donorDetails;
}
