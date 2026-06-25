package com.danzapp.repository;

import com.danzapp.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCityContainingIgnoreCase(String city);
    List<Event> findByDanceStyleContainingIgnoreCase(String style);
    List<Event> findByFeaturedTrue();
    List<Event> findByCategoryIgnoreCase(String category);
}