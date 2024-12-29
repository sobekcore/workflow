package com.sobekcore.workflow.auth;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.auth.user.UserRepository;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
public class AuthContext {
    private final UserRepository userRepository;

    public AuthContext(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof AnonymousAuthenticationToken) {
            return null;
        }

        OAuth2User user = (OAuth2User) authentication.getPrincipal();
        String email = user.getAttribute("email");

        if (email == null || email.isEmpty()) {
            return null;
        }

        return userRepository.findByEmail(email).orElse(null);
    }
}
