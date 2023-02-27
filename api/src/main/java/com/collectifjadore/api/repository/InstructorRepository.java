package com.collectifjadore.api.repository;


import com.collectifjadore.api.models.Instructor;
import com.collectifjadore.api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface InstructorRepository extends MongoRepository<Instructor, String>,CommonRepository {
    Optional<Instructor> findByUsernameAndEmail(String username,String email);
    List<Instructor> findAll();
    Optional<Instructor> findById( String id);


}