package com.danzapp.repository;

import com.danzapp.model.Workshop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkshopRepository extends JpaRepository<Workshop, Long> {
    List<Workshop> findByDanceStyleContainingIgnoreCase(String danceStyle);
}