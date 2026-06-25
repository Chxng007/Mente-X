package com.danzapp.repository;

import com.danzapp.model.DanceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanceHistoryRepository extends JpaRepository<DanceHistory, Long> {
    List<DanceHistory> findByFeaturedTrue();
    List<DanceHistory> findByDanceStyleContainingIgnoreCase(String danceStyle);
}
