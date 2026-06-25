package com.danzapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "dance_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String subtitle;
    private String origin;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String imageUrl;
    private String videoUrl;

    private int readTimeMin;
    private String danceStyle;

    @Builder.Default
    private boolean featured = false;

    private LocalDateTime createdAt;
}
