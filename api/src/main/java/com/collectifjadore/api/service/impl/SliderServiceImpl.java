package com.collectifjadore.api.service.impl;

import com.collectifjadore.api.models.Course;
import com.collectifjadore.api.models.Slider;
import com.collectifjadore.api.repository.SliderRepository;
import com.collectifjadore.api.service.SliderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SliderServiceImpl  implements SliderService {
    @Autowired
    SliderRepository sliderRepository;

    @Override
    public void create(Slider slider) {
        sliderRepository.save((slider));
    }

    @Override
    public void deleteById(String id) {
        sliderRepository.deleteById(id);

    }

    @Override
    public Page<Slider> getAll(Pageable page) {
        return sliderRepository.findAll(page);
    }

    @Override
    public Optional<Slider> findById(String id) {
        return sliderRepository.findById(id);
    }
}
