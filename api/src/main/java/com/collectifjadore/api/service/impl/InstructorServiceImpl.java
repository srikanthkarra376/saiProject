package com.collectifjadore.api.service.impl;

import com.collectifjadore.api.commun.MapStructMapper;
import com.collectifjadore.api.models.*;
import com.collectifjadore.api.payload.request.InstructorDto;
import com.collectifjadore.api.repository.CourseRepository;
import com.collectifjadore.api.repository.InstructorRepository;
import com.collectifjadore.api.service.CourseService;
import com.collectifjadore.api.service.InstructorService;
import com.collectifjadore.api.service.RoleService;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class InstructorServiceImpl implements InstructorService {


    @Autowired
    InstructorRepository instructorRepository;

    @Autowired
    RoleService roleService;

    @Autowired
    MongoOperations mongoOperations;

    @Autowired
    MapStructMapper mapStructMapper;


    @Override
    public void create(InstructorDto instructorDto) {
        Instructor instructor=    convertInstructorDtoToInstructor(instructorDto);
        if(instructorDto.getRoles()!=null && !instructorDto.getRoles().isEmpty()){
            instructor.setRoles(roleService.getRoles(instructorDto.getRoles()));
        }
        mongoOperations.save(instructor);
    }



    @Override
    public void deleteById(String id) {
        instructorRepository.deleteById(id);
    }

    @Override
    public Page<InstructorDto> getAll(Pageable page) {
        Page<Instructor>  pageInstructors= instructorRepository.findAll(page);
        List<InstructorDto> instructorDtos=new ArrayList<>();
        if(pageInstructors!=null && pageInstructors.getContent()!=null && !pageInstructors.getContent().isEmpty()){
            pageInstructors.getContent().stream().forEach(content->{
                instructorDtos.add(convertInstructorToInstructorDto(content));
                    }

            );

        }


        return new PageImpl<>(instructorDtos, pageInstructors.getPageable(), pageInstructors.getTotalElements());
    }

    @Override
    public Optional<InstructorDto> findByUsernameAndEmail(String username,String email) {

        Optional<Instructor> instructor= instructorRepository.findByUsernameAndEmail(username,email);
        if(instructor.isPresent() && !instructor.isEmpty()){
            return Optional.of(convertInstructorToInstructorDto(instructor.get()));
        }else{
            return Optional.empty();
        }

    }

    @Override
    public Optional<InstructorDto> findById(String id) {
        Optional<Instructor> instructor= instructorRepository.findById(id);
        if(instructor.isPresent() && !instructor.isEmpty()){
            return Optional.of(convertInstructorToInstructorDto(instructor.get()));
        }else{
            return Optional.empty();
        }

    }

    InstructorDto convertInstructorToInstructorDto(Instructor instructor){
        return InstructorDto.builder()
                .id(instructor.getId())
                .email(instructor.getEmail())
                .firstName(instructor.getFirstName())
                .lastName(instructor.getLastName())
                .password(instructor.getPassword())
                .username(instructor.getUsername())
                .id(instructor.getId())
                .roles(instructor.getRoles().stream().map(role->role.getName().name()).collect(Collectors.toSet()))
                .bio(instructor.getBio())
                .designation(instructor.getDesignation())
                .profilePictureLink(instructor.getProfilePictureLink())
                .build();
    }

    Instructor convertInstructorDtoToInstructor(InstructorDto instructorDto){

        Set<Role> roles=roleService.getRoles(instructorDto.getRoles());

        return Instructor.builder()
                .email(instructorDto.getEmail())
                .firstName(instructorDto.getFirstName())
                .lastName(instructorDto.getLastName())
                .password(instructorDto.getPassword())
                .username(instructorDto.getUsername())
                .id(instructorDto.getId())
                .roles(roles)
                .bio(instructorDto.getBio())
                .designation(instructorDto.getDesignation())
                .profilePictureLink(instructorDto.getProfilePictureLink())
                .build();

    }
}
