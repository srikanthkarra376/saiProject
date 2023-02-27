package com.collectifjadore.api.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "review")
public class Review extends  User{

}
