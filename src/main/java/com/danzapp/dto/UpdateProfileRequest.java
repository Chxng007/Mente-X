package com.danzapp.dto;
import lombok.Data;
import java.util.Set;

@Data
public class UpdateProfileRequest {
    private String name;
    private String bio;
    private String level;
    private Set<String> danceStyles;
    private Boolean onboardingCompleted;
}