package com.danzapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.danzapp.model.History;

@Repository
public interface HistoryRepository extends JpaRepository< History, Long>{

}
