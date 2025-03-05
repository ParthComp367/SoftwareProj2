package com.rr.spring.jpa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(
		scanBasePackages= {"com.recruitrooms.config",
				"com.recruitrooms.controllers",
				"com.recruitrooms.dto",
				"com.recruitrooms.models",
				"com.recruitrooms.repositories",
				"com.recruitrooms.services",
				"com.recruitrooms.utils",
				"com.rr.spring.jpa"
		})
@ComponentScan("com.rr.spring.jpa")
@EntityScan(basePackages = {"com.recruitrooms.services"})


public class RecruiteRoomBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecruiteRoomBackendApplication.class, args);
		System.out.println("Running springboot app for book..");		
	}
}

