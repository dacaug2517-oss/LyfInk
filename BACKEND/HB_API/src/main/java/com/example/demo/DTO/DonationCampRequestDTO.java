package com.example.demo.DTO;

import java.sql.Date;
import java.sql.Time;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DonationCampRequestDTO {

    private int hbid;
    private String camp_name;
    private String venue;

    private Date date;
    private Time from_time;
    private Time to_time;

    private String contact_person;
    private String address;

    private int stateid;
    private int cityid;
}
