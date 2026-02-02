package com.example.demo.dto;

import java.sql.Date;

public class DonationHistoryDTO {

    private Date date;
    private String bloodBank;
    private String bloodType;
    private String status;

    public DonationHistoryDTO(Date date, String bloodBank,
                              String bloodType, String status) {
        this.date = date;
        this.bloodBank = bloodBank;
        this.bloodType = bloodType;
        this.status = status;
    }

    public Date getDate() { return date; }
    public String getBloodBank() { return bloodBank; }
    public String getBloodType() { return bloodType; }
    public String getStatus() { return status; }
}
