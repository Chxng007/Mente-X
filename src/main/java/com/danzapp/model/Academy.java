package com.danzapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "academies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Academy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String address;
    private String phone;
    private String socialLinks;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @Builder.Default
    private Boolean approved = false;

    private LocalDateTime createdAt;
}
