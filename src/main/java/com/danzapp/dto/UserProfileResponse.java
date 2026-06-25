package com.danzapp.dto;
import java.util.Set;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileResponse {
    private Long id;
    private String email;
    private String name;
    private String avatarUrl;
    private String bio;
    private String level;
    private Set<String> danceStyles;
    private Boolean onboardingCompleted;
}
