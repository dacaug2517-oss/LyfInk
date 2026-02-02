package com.example.demo.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BloodRequestDTO {

    private int userid;
    private int bcid;
    private int quantity;
    private Date request_date;
    private Date requiredby;
    private String purpose;
    private String contact_no;
    private int stateid;
    private int cityid;
}
