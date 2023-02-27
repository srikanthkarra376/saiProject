package com.collectifjadore.api.service;

import com.collectifjadore.api.models.Course;

import java.util.Optional;

public interface CourseService extends CommonService<Course> {
    Optional<Course> findByName(String name);
    Optional<Course> findById(String id);
}
