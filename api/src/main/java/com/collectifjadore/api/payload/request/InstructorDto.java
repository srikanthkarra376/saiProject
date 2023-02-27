package com.collectifjadore.api.payload.request;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class InstructorDto extends SignupRequest {

    private String bio;
    private String designation;
    private String profilePictureLink;

}
