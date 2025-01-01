package com.sobekcore.workflow.auth;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.auth.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthContextTest {
    @Mock
    UserRepository userRepository;

    AuthContext authContext;

    User user;

    @BeforeEach
    void setup() {
        authContext = new AuthContext(userRepository);
        user = new User("user@test.com", "User");
    }

    @Test
    void shouldReturnUser() {
        when(userRepository.findByEmail(user.getEmail()))
            .thenReturn(Optional.of(user));

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", user.getEmail());
        attributes.put("name", user.getName());

        SecurityContextHolder.getContext().setAuthentication(
            new TestingAuthenticationToken(
                new DefaultOAuth2User(Collections.emptyList(), attributes, "name"),
                null
            )
        );

        assertEquals(user, authContext.getUser());
    }

    @Test
    void shouldReturnNullWhenEmailIsEmpty() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("name", user.getName());

        SecurityContextHolder.getContext().setAuthentication(
            new TestingAuthenticationToken(
                new DefaultOAuth2User(Collections.emptyList(), attributes, "name"),
                null
            )
        );

        assertNull(authContext.getUser());
    }

    @Test
    void shouldReturnNullWhenUserIsNotFound() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", user.getEmail());
        attributes.put("name", user.getName());

        SecurityContextHolder.getContext().setAuthentication(
            new TestingAuthenticationToken(
                new DefaultOAuth2User(Collections.emptyList(), attributes, "name"),
                null
            )
        );

        assertNull(authContext.getUser());
    }

    @Test
    void shouldReturnNullWhenUserIsAnonymous() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("name", user.getName());

        SecurityContextHolder.getContext().setAuthentication(
            new AnonymousAuthenticationToken(
                "key",
                new DefaultOAuth2User(Collections.emptyList(), attributes, "name"),
                List.of(new SimpleGrantedAuthority("anonymous"))
            )
        );

        assertNull(authContext.getUser());
    }
}
