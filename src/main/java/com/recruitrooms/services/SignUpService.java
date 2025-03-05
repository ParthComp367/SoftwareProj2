package com.recruitrooms.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recruitrooms.models.User;
import com.recruitrooms.repositories.UserRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class SignUpService {

    @Autowired
    private UserRepository userRepository;

    // Saving a user where userName and phoneNuber should be unique
    public Mono<User> registerUser(User user) {
    	if(!userRepository.existByUserName(user.getUsername()) && !userRepository.existByPhoneNumber(user.getPhoneNumber())) {
    		return userRepository.save(user);
    	}
    	else
    		return null;
    }

    // Getting a user by username
    public Mono<User> getByUserName(final String username) {
        return userRepository.findByUsername(username);  // Change to return Mono<User>
    }
    
    public Flux<User> getByUserRole(final String role){
    	return userRepository.findByRole(role);
    }
 
    // Deleting a user by username
    public Mono<Void> deleteUser(final String username) {
        return getByUserName(username)
                .flatMap(user -> userRepository.delete(user))  // Delete user
                .switchIfEmpty(Mono.empty());  // If user is not found, return an empty Mono
    }
}
