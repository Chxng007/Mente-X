package com.danzapp.controller;

import com.danzapp.model.DanceHistory;
import com.danzapp.repository.DanceHistoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class DanceHistoryController {

    private final DanceHistoryRepository danceHistoryRepository;

    public DanceHistoryController(DanceHistoryRepository danceHistoryRepository) {
        this.danceHistoryRepository = danceHistoryRepository;
    }

    @GetMapping
    public List<DanceHistory> getAllHistory() {
        return danceHistoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DanceHistory> getHistoryById(@PathVariable Long id) {
        return danceHistoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/featured")
    public List<DanceHistory> getFeaturedHistory() {
        return danceHistoryRepository.findByFeaturedTrue();
    }
}
