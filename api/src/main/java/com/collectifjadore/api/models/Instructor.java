package com.collectifjadore.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "instructor")
@SuperBuilder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Instructor  extends  User {
    private String bio;
    private String designation;
    private String profilePictureLink;

}
