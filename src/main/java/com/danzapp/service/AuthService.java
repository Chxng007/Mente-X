package com.danzapp.service;

import com.danzapp.dto.JwtResponse;
import com.danzapp.dto.LoginRequest;
import com.danzapp.dto.SignupRequest;
import com.danzapp.model.User;
import com.danzapp.repository.UserRepository;
import com.danzapp.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        User userDetails = (User) authentication.getPrincipal();
        
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