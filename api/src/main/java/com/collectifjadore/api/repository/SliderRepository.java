package com.collectifjadore.api.repository;

import com.collectifjadore.api.models.Course;
import com.collectifjadore.api.models.Slider;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SliderRepository  extends MongoRepository<Slider, String> {
}
