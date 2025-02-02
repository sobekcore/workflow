package com.sobekcore.workflow.auth;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.auth.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.server.Cookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Optional;

public class AuthSuccessHandler implements AuthenticationSuccessHandler {
    private static final Logger log = LoggerFactory.getLogger(AuthSuccessHandler.class);

    private final String successUrl;

    private final UserRepository userRepository;

    public AuthSuccessHandler(String successUrl, UserRepository userRepository) {
        this.successUrl = successUrl;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
    ) throws IOException {
        OAuth2User user = (OAuth2User) authentication.getPrincipal();
        String email = user.getAttribute("email");
        String name = user.getAttribute("name");

        if (email == null || name == null || email.isBlank() || name.isBlank()) {
            response.sendRedirect("/login");
            return;
        }

        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            userRepository.save(new User(email, name));
            log.info("User {} has been created", email);
        }

        log.info("User {} has logged in", email);

        response.setHeader(HttpHeaders.SET_COOKIE, createSessionCookie(request).toString());
        response.sendRedirect(successUrl);
    }

    private ResponseCookie createSessionCookie(HttpServletRequest request) {
        return ResponseCookie
            .from(request.getServletContext().getSessionCookieConfig().getName(), request.getSession().getId())
            .path("/")
            .httpOnly(true)
            .sameSite(Cookie.SameSite.STRICT.attributeValue())
            .build();
    }
}
