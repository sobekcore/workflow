package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.ControllerTest;
import com.sobekcore.workflow.auth.AuthContext;
import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.auth.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

@WebMvcTest(AuthController.class)
class AuthControllerTest extends ControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    AuthContext authContext;

    @MockBean
    UserService userService;

    @Test
    void shouldReturnReadUser() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders
                .get("/api/auth/user")
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldReturnUpdatedUser() throws Exception {
        User user = new User("user@test.com", "User");

        when(authContext.getUser())
            .thenReturn(user);

        mockMvc
            .perform(MockMvcRequestBuilders
                .put("/api/auth/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(String.format("""
                    {
                        "email": "%s",
                        "name": "%s"
                    }
                """, user.getEmail(), user.getName()))
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldReturnForbiddenWhenEmailsAreMismatched() throws Exception {
        User user = new User("user@test.com", "User");

        when(authContext.getUser())
            .thenReturn(user);

        mockMvc
            .perform(MockMvcRequestBuilders
                .put("/api/auth/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "email": "user2@test.com",
                        "name": "User 2"
                    }
                """)
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isForbidden());
    }
}
