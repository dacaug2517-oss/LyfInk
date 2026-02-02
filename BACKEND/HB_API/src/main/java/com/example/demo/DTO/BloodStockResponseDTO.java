package com.example.demo.DTO;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BloodStockResponseDTO {
    private int bsid;
    private String bloodType;
    private int ml;
    private Date expiryDate;
}
