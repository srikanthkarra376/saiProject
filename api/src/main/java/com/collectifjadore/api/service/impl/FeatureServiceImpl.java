package com.collectifjadore.api.service.impl;

import com.collectifjadore.api.models.Feature;
import com.collectifjadore.api.models.Slider;
import com.collectifjadore.api.repository.FeatureRepository;
import com.collectifjadore.api.repository.SliderRepository;
import com.collectifjadore.api.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class FeatureServiceImpl  implements FeatureService {

    @Autowired
    FeatureRepository featureRepository;

    @Override
    public void create(Feature feature) {
        featureRepository.save((feature));
    }
    @Override
    public void deleteById(String t) {

    }
    @Override
    public Page<Feature> getAll(Pageable page) {
        return featureRepository.findAll(page);
    }
}
