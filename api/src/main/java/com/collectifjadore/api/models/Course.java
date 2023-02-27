package com.collectifjadore.api.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Document(collection = "course")
@Data
@Builder
public class Course {

    @Id
    private String id;
    @NotBlank
    @Size(max = 255)
    @Indexed(unique = true)
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    @DBRef
    private List<CurriculumEntry> curriculums = new ArrayList<>();
    private Instructor instructor;
    private LocalDate lastupdate;
    private String description;
    @DBRef
    private List<Student> members = new ArrayList<>();
    @DBRef
    private List<Review> reviews = new ArrayList<>();
    private Double cost;
    private Double discount;
    private Integer durationWeeks;
    private String language;
    private String pictureLink;
    private String videolink;

}
