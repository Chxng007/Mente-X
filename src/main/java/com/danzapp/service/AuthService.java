package com.danzapp.service;

import com.danzapp.dto.JwtResponse;
import com.danzapp.dto.LoginRequest;
import com.danzapp.dto.SignupRequest;
import com.danzapp.model.User;
import com.danzapp.repository.UserRepository;
import com.danzapp.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       PasswordEncoder encoder,
                       JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User userDetails = (User) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(userDetails);
        
        return new JwtResponse(jwt, 
                             userDetails.getId(), 
                             userDetails.getEmail(),
                             userDetails.getAuthorities().stream().map(item -> item.getAuthority()).toList());
    }

    public User registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User.Role role = User.Role.USER;
        if (signUpRequest.getRole() != null && signUpRequest.getRole().equalsIgnoreCase("ACADEMY")) {
            role = User.Role.ACADEMY;
        }

        User user = new User(signUpRequest.getEmail(),
                           encoder.encode(signUpRequest.getPassword()),
                           signUpRequest.getName(),
                           role);

        return userRepository.save(user);
    }
}
