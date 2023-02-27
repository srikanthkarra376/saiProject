package com.collectifjadore.api.service.impl;

import com.collectifjadore.api.models.*;
import com.collectifjadore.api.repository.CourseRepository;
import com.collectifjadore.api.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoOperations;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {


    @Autowired
    CourseRepository courseRepository;

    @Autowired
    MongoOperations mongoOperations;

    @Override
    public void create(Course course) {
        if (course.getCurriculums() != null && !course.getCurriculums().isEmpty()) {
            course.getCurriculums().forEach(currl-> mongoOperations.save(currl));
        }

        if (course.getMembers()!=null && !course.getMembers().isEmpty()) {
            course.getMembers().stream().forEach(member -> {
                mongoOperations.save(member);
            });
        }

        if (course.getReviews()!=null && !course.getReviews().isEmpty()) {
            course.getReviews().stream().forEach(review -> {
                mongoOperations.save(review);
            });
        }

        if (course.getInstructor() != null) {
            mongoOperations.save(course.getInstructor());
        }
        courseRepository.save(course);
    }

    @Override
    public void deleteById(String id) {
        courseRepository.deleteById(id);
    }

    @Override
    public Page<Course> getAll(Pageable pageable) {
//Page<Course> coursePage= new PageImpl<>(Arrays.asList(getCourse()),pageable,1);
        return courseRepository.findAll(pageable);
//        return coursePage;
    }

    @Override
    public Optional<Course> findByName(String name) {
        return courseRepository.findByTitle(name);
    }

    @Override
    public Optional<Course> findById(String id) {
        return courseRepository.findById(id);
    }


    public Course getCourse() {
        List<Student> members = Arrays.asList(new Student());
        return Course.builder()
                .cost(50.0)
                .curriculums((List<CurriculumEntry>) new CurriculumEntry())
                .description("un cours test")
                .discount(2.0)
                .durationWeeks(5)
                .endDate(LocalDate.now())
                .instructor(new Instructor())
                .language("FR")
                .lastupdate(LocalDate.now())
                .members(members)
                .pictureLink("not")
                .title("test")
                .videolink("vide")
                .build();
    }

}
