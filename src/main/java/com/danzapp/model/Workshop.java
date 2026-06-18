package com.danzapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "workshops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Workshop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Modality modality; // VIRTUAL, PRESENCIAL, HYBRID

    @Enumerated(EnumType.STRING)
    private AccessType accessType; // PUBLIC, PRIVATE

    private Integer capacity;
    private BigDecimal price;
    
    private String videoUrl; // Para contenido privado

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "academy_id")
    private Academy academy;

    private LocalDateTime createdAt;

    public enum Modality {
        VIRTUAL, PRESENCIAL, HYBRID
    }

    public enum AccessType {
        PUBLIC, PRIVATE
    }
}