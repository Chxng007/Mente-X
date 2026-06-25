package com.danzapp.dto;

import java.util.List;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String name;
    private List<String> roles;
    private boolean onboardingCompleted;

    public JwtResponse(String token, Long id, String email, String name, List<String> roles, boolean onboardingCompleted) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.name = name;
        this.roles = roles;
        this.onboardingCompleted = onboardingCompleted;
    }
}