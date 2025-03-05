package com.recruitrooms.repositories;

import java.util.Optional;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.recruitrooms.models.User;

public interface UserRepository extends ReactiveMongoRepository<User, String> {

    Optional<User> findByUsername(String username);
    
}