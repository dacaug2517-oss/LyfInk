package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
public class RestApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestApiApplication.class, args);
	}

}

//eureka.client.registerWithEureka=true
//eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka
//
//eureka.instance.hostname=localhost
//eureka.instance.preferIpAddress=true