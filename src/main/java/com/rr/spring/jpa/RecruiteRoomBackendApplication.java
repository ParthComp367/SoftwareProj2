package com.rr.spring.jpa;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class RecruiteRoomBackendApplication {

	public static void main(String[] args) {
		SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[32];  // 256-bit key
        secureRandom.nextBytes(key);
        String secretKey = Base64.getEncoder().encodeToString(key);
        System.out.println(secretKey);  // Print the generated secret key (store this securely)
    
		SpringApplication.run(RecruiteRoomBackendApplication.class, args);
		
	}

}
