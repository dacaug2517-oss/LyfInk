package com.example.demo.DTO;


public class BloodRequestFullDTO {
	
	private int brid;
    private int quantity;
    private String contactNo;

    private String hbName;
    private String hbEmail;

    private String cityName;
    private String stateName;

    private String bcName;

    public BloodRequestFullDTO(
    		int brid,
            int quantity,
            String contactNo,
            String hbName,
            String hbEmail,
            String cityName,
            String stateName,
            String bcName
    ) {
    	this.brid=brid;
        this.quantity = quantity;
        this.contactNo = contactNo;
        this.hbName = hbName;
        this.hbEmail = hbEmail;
        this.cityName = cityName;
        this.stateName = stateName;
        this.bcName = bcName;
    }

    // ✅ Getters
    public int getBrid() {
        return brid;
    }
    
    public int getQuantity() {
        return quantity;
    }

    public String getContactNo() {
        return contactNo;
    }

    public String getHbName() {
        return hbName;
    }

    public String getHbEmail() {
        return hbEmail;
    }

    public String getCityName() {
        return cityName;
    }

    public String getStateName() {
        return stateName;
    }

    public String getBcName() {
        return bcName;
    }
}

