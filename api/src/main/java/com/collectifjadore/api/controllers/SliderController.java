package com.collectifjadore.api.controllers;

import com.collectifjadore.api.models.Slider;

import com.collectifjadore.api.service.SliderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class SliderController {

    @Autowired
    SliderService sliderService;


    @PostMapping("/slider")
    public ResponseEntity<?> createSlider(@Valid @RequestBody Slider slider) {
        sliderService.create(slider);
        return ResponseEntity.created(URI.create("/slider/" + slider.getId())).build();
    }
    @GetMapping("/sliders")
    public ResponseEntity<?> getSliders(Pageable page) {

        return ResponseEntity.ok(sliderService.getAll(page));
    }

    @GetMapping("/slider/{id}")
    public ResponseEntity<?> getSlider(@PathVariable String id) {
        return ResponseEntity.ok(sliderService.findById(id));
    }

    @DeleteMapping("/slider/{id}")
    public ResponseEntity<?> deleteSlider(@PathVariable String id) {
        sliderService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
