package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.ControllerTest;
import com.sobekcore.workflow.auth.AuthContext;
import com.sobekcore.workflow.auth.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
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

    @Test
    void shouldReturnUser() throws Exception {
        User user = new User("user@test.com", "User");

        when(authContext.getUser())
            .thenReturn(user);

        mockMvc
            .perform(MockMvcRequestBuilders
                .get("/auth/user")
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
