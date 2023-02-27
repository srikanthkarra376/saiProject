package com.collectifjadore.api.repository;

import com.collectifjadore.api.models.Course;
import com.collectifjadore.api.models.ERole;
import com.collectifjadore.api.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends MongoRepository<Course, String>{
    Optional<Course> findByTitle(String title);
    Optional<Course> findById(String id);
}
