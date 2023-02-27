package com.collectifjadore.api.models;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "feature")
@Data
public class Feature {
    @Id
    private String id;
    private String mainTextA;
    private String descriptionA;
    private  String buttonTextA;
    private String buttonLinkA;
    private String mainTextB;
    private String descriptionB;
    private  String buttonTextB;
    private String buttonLinkB;
    private String mainTextC;
    private String descriptionC;
    private  String buttonTextC;
    private String buttonLinkC;
}
