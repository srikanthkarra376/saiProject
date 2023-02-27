package com.collectifjadore.api.service;

import com.collectifjadore.api.models.Course;
import com.collectifjadore.api.models.Instructor;
import com.collectifjadore.api.models.User;
import com.collectifjadore.api.payload.request.InstructorDto;

import java.util.Optional;

public interface InstructorService extends CommonService<InstructorDto> {
    Optional<InstructorDto> findByUsernameAndEmail(String username, String email);
    Optional<InstructorDto> findById(String id);
}
