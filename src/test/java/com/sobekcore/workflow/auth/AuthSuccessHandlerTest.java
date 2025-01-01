package com.sobekcore.workflow.auth;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.auth.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthSuccessHandlerTest {
    @Mock
    MockHttpServletResponse response;

    @Mock
    UserRepository userRepository;

    AuthSuccessHandler authSuccessHandler;

    User user;

    @BeforeEach
    void setup() {
        authSuccessHandler = new AuthSuccessHandler("/success", userRepository);
        user = new User("user@test.com", "User");
    }

    @Test
    void shouldSaveUserAndRedirect() throws IOException {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", user.getEmail());
        attributes.put("name", user.getName());

        authSuccessHandler.onAuthenticationSuccess(
            new MockHttpServletRequest(),
            response,
            new TestingAuthenticationToken(
                new DefaultOAuth2User(Collections.emptyList(), attributes, "name"),
                null
            )
        );

        verify(userRepository, times(1))
            .save(any(User.class));
        verify(response, times(1))
            .sendRedirect("/success");
    }

    @Test
    void shouldRedirectWhenUserAlreadyExists() throws IOException {
        when(userRepository.findByEmail(user.getEmail()))
            .thenReturn(Optional.of(user));

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", user.getEmail());
        attributes.put("name", user.getName());

        authSuccessHandler.onAuthenticationSuccess(
            new MockHttpServletRequest(),
            response,
            new TestingAuthenticationToken(
                new DefaultOAuth2User(Collections.emptyList(), attributes, "name"),
                null
            )
        );

        verify(userRepository, never())
            .save(any(User.class));
        verify(response, times(1))
            .sendRedirect("/success");
    }

    @Test
    void shouldRedirectWhenEmailOrNameIsEmpty() throws IOException {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("name", user.getName());

        authSuccessHandler.onAuthenticationSuccess(
            new MockHttpServletRequest(),
            response,
            new TestingAuthenticationToken(
                new DefaultOAuth2User(Collections.emptyList(), attributes, "name"),
                null
            )
        );

        verify(userRepository, never())
            .save(any(User.class));
        verify(response, times(1))
            .sendRedirect("/login");
    }
}
