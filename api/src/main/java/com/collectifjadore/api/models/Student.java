package com.collectifjadore.api.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "student")
public class Student  extends  User{

}
