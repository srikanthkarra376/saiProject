package com.collectifjadore.api.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "slider")
@Data
public class Slider {
    @Id
    private String id;
    private String mainText;
    private String description;
    private String imageLink;
    private String buttonText;
    private String buttonLink;
}
