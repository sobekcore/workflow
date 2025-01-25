package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.auth.AuthContext;
import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.auth.user.UserDto;
import com.sobekcore.workflow.auth.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@PreAuthorize("isAuthenticated()")
class AuthController {
    private final AuthContext authContext;

    private final UserService userService;

    public AuthController(AuthContext authContext, UserService userService) {
        this.authContext = authContext;
        this.userService = userService;
    }

    @GetMapping("/user")
    public User readUser() {
        return authContext.getUser();
    }

    @PutMapping("/user")
    public User updateUser(@Valid @RequestBody UserDto userDto) {
        User user = authContext.getUser();

        if (!user.getEmail().equals(userDto.email())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        return userService.update(userDto);
    }
}
