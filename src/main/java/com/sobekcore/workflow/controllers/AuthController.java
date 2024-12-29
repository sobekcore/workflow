package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.auth.AuthContext;
import com.sobekcore.workflow.auth.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
class AuthController {
    private final AuthContext authContext;

    public AuthController(AuthContext authContext) {
        this.authContext = authContext;
    }

    @GetMapping("/user")
    public User user() {
        User user = authContext.getUser();

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}
