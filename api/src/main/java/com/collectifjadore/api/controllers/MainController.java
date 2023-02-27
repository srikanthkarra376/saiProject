package com.collectifjadore.api.controllers;

import com.collectifjadore.api.models.Course;
import com.collectifjadore.api.models.Instructor;
import com.collectifjadore.api.models.User;
import com.collectifjadore.api.payload.request.InstructorDto;
import com.collectifjadore.api.payload.request.ResetPassword;
import com.collectifjadore.api.payload.request.UpdateUserInfo;
import com.collectifjadore.api.payload.response.MessageResponse;
import com.collectifjadore.api.repository.UserRepository;
import com.collectifjadore.api.service.InstructorService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.collectifjadore.api.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api2")
public class MainController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    CourseService courseService;
    @Autowired
    InstructorService instructorService;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUser(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateUserInfo user, @PathVariable("id") String id) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            User _user = userData.get();
            _user.setFirstName(user.getFirstName());
            _user.setLastName(user.getLastName());
            _user.setEmail(user.getEmail());
            return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/user/resetpassword")
    public ResponseEntity<?> resetPasswordFromBo(@Valid @RequestBody ResetPassword resetPassword) {
        Optional<User> userData = userRepository.findByUsername(resetPassword.getUsername());
        if (userData != null) {
            User user = userData.get();
            BCryptPasswordEncoder decoder = new BCryptPasswordEncoder();
            if (decoder.matches(resetPassword.getOldPassword(), user.getPassword())) {
                user.setPassword(encoder.encode(resetPassword.getNewPassword()));
                userRepository.save(user);
                return ResponseEntity.ok(new MessageResponse("User password updated successfully!"));
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Your current password is incorrect"));
            }
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
    }
    //********************************************************//
    //***********CRUD for the courses ************************//
    //********************************************************//

    @GetMapping("/courses")
    public ResponseEntity<?> getCourses(Pageable page) {

        return ResponseEntity.ok(courseService.getAll(page));
    }

    @GetMapping("/course/{id}")
    public ResponseEntity<?> getCourse(@PathVariable String id) {
        return ResponseEntity.ok(courseService.findById(id));
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable String id) {
        courseService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/course")
    public ResponseEntity<?> createCourse(@Valid @RequestBody Course course) {
        courseService.create(course);
        return ResponseEntity.created(URI.create("/courses/" + course.getId())).build();
    }



    //********************************************************//
    //***********CRUD for the Instructor ************************//
    //********************************************************//

    @GetMapping("/instructors")
    public ResponseEntity<?> getInstructors(Pageable page) {

        return ResponseEntity.ok(instructorService.getAll(page));
    }

    @GetMapping("/instructor/{id}")
    public ResponseEntity<?> getInstructor(@PathVariable String id) {
        return ResponseEntity.ok(instructorService.findById(id));
    }

    @DeleteMapping("/instructor/{id}")
    public ResponseEntity<?> deleteInstructor(@PathVariable String id) {
        instructorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/instructor")
    public ResponseEntity<?> createInstructor(@Valid @RequestBody InstructorDto instructor) {
        instructorService.create(instructor);
        return ResponseEntity.created(URI.create("/instructors/" + instructor.getId())).build();
    }




}
