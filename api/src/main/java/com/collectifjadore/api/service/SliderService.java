package com.collectifjadore.api.service;

import com.collectifjadore.api.models.Slider;

public interface SliderService extends CommonService<Slider>{
    Object findById(String id);
}
