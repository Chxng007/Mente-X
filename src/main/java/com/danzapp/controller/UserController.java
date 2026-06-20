package com.danzapp.controller;

import com.danzapp.dto.UpdateProfileRequest;
import com.danzapp.dto.UserProfileResponse;
import com.danzapp.model.User;
import com.danzapp.repository.UserRepository;
import com.danzapp.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public UserController(UserRepository userRepository, FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(toResponse(findCurrentUser(authentication)));
    }

    @PatchMapping("/me")
    public ResponseEntity<UserProfileResponse> updateProfile(Authentication authentication,
            @RequestBody UpdateProfileRequest request) {
        User user = findCurrentUser(authentication);

        if (request.getName() != null)
            user.setName(request.getName());
        if (request.getBio() != null)
            user.setBio(request.getBio());
        if (request.getDanceStyles() != null)
            user.setDanceStyles(request.getDanceStyles());
        if (request.getOnboardingCompleted() != null)
            user.setOnboardingCompleted(request.getOnboardingCompleted());
        if (request.getLevel() != null) {
            try {
                user.setLevel(User.Level.valueOf(request.getLevel().toUpperCase()));
            } catch (IllegalArgumentException ex) {
                throw new IllegalArgumentException("Nivel inválido. Usa BEGINNER, INTERMEDIATE o ADVANCED.");
            }
        }

        userRepository.save(user);
        return ResponseEntity.ok(toResponse(user));
    }

    @PostMapping("/me/avatar")
    public ResponseEntity<UserProfileResponse> uploadAvatar(Authentication authentication,
            @RequestParam("file") MultipartFile file) {
        User user = findCurrentUser(authentication);
        user.setAvatarUrl(fileStorageService.storeAvatar(file, user.getId()));
        userRepository.save(user);
        return ResponseEntity.ok(toResponse(user));
    }

    private User findCurrentUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Usuario no encontrado."));
    }

    private UserProfileResponse toResponse(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .avatarUrl(user.getAvatarUrl())
                .bio(user.getBio())
                .level(user.getLevel() != null ? user.getLevel().name() : null)
                .danceStyles(user.getDanceStyles())
                .onboardingCompleted(user.getOnboardingCompleted())
                .build();
    }
}