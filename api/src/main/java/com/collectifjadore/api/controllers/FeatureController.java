package com.collectifjadore.api.controllers;

import com.collectifjadore.api.models.Feature;
import com.collectifjadore.api.models.Slider;
import com.collectifjadore.api.service.FeatureService;
import com.collectifjadore.api.service.SliderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v2")
public class FeatureController {


    @Autowired
    FeatureService featureService;


    @PostMapping("/feature")
    public ResponseEntity<?> createFeature(@Valid @RequestBody Feature feature) {
        featureService.create(feature);
        return ResponseEntity.created(URI.create("/feature/" + feature.getId())).build();
    }
    @GetMapping("/features")
    public ResponseEntity<?> getFeatures(Pageable page) {
        return ResponseEntity.ok( featureService.getAll(page));
    }


}
