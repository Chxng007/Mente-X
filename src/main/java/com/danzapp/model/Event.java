package com.danzapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String imageUrl;
    
    @Column(nullable = false)
    private String city;

    private String address;
    private BigDecimal price;
    
    @Column(nullable = false)
    private LocalDateTime eventDate;

    private String danceStyle; // Salsa, Bachata, etc.
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizer_id")
    private User organizer;

    private LocalDateTime createdAt;
}