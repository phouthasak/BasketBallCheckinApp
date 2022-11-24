package com.phouthasak.webapp.basketballCheckin.controller;

import com.phouthasak.webapp.basketballCheckin.controller.helper.UserHelper;
import com.phouthasak.webapp.basketballCheckin.dto.JwtTokenDto;
import com.phouthasak.webapp.basketballCheckin.dto.SignInDto;
import com.phouthasak.webapp.basketballCheckin.dto.UserDto;
import com.phouthasak.webapp.basketballCheckin.exception.InvalidException;
import com.phouthasak.webapp.basketballCheckin.security.CurrentlyLoggedUser;
import com.phouthasak.webapp.basketballCheckin.security.CustomUserDetailsService;
import com.phouthasak.webapp.basketballCheckin.security.UserPrincipal;
import com.phouthasak.webapp.basketballCheckin.service.UserManagerService;
import com.phouthasak.webapp.basketballCheckin.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserManagerService userManagerService;

    @Autowired
    private UserHelper userHelper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PutMapping("/signup")
    public UserDto signUp(
            @RequestBody UserDto user) {
        userHelper.convertEmailToLowerCase(user);
        userHelper.validateUserCreation(user);
        UserDto createdUser = userHelper.sanitizeUser(userManagerService.createUser(user));

        return createdUser;
    }

    @PostMapping("/login")
    public JwtTokenDto login(@RequestBody SignInDto signInDto) {
        authenticate(signInDto.getUserName(), signInDto.getPassword());
        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(signInDto.getUserName());

        final String token = jwtUtil.generateToken(userDetails);

        return new JwtTokenDto(token);
    }

    private void authenticate(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new InvalidException("user_disabled");
        } catch (BadCredentialsException e) {
            throw new InvalidException("invalid_credentials");
        }
    }
}
