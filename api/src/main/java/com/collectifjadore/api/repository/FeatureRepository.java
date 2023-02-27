package com.collectifjadore.api.repository;

import com.collectifjadore.api.models.Feature;
import com.collectifjadore.api.models.Slider;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FeatureRepository extends MongoRepository<Feature, String> {
}
