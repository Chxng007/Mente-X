package com.danzapp.controller;

import com.danzapp.model.Workshop;
import com.danzapp.repository.WorkshopRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workshops")
public class WorkshopController {

    private final WorkshopRepository workshopRepository;

    public WorkshopController(WorkshopRepository workshopRepository) {
        this.workshopRepository = workshopRepository;
    }

    @GetMapping
    public List<Workshop> getAllWorkshops() {
        return workshopRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workshop> getWorkshopById(@PathVariable Long id) {
        return workshopRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Workshop createWorkshop(@RequestBody Workshop workshop) {
        return workshopRepository.save(workshop);
    }

    @GetMapping("/style/{style}")
    public List<Workshop> getWorkshopsByStyle(@PathVariable String style) {
        return workshopRepository.findByDanceStyleContainingIgnoreCase(style);
    }
}
