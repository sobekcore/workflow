package com.sobekcore.workflow;

import com.sobekcore.workflow.auth.user.UserRepository;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

@Import(SecurityConfig.class)
public abstract class ControllerTest {
    @MockBean
    UserRepository userRepository;

    protected final RequestPostProcessor oauth2Login = SecurityMockMvcRequestPostProcessors
        .oauth2Login()
        .attributes(attributes -> attributes.put("email", "user@test.com"))
        .attributes(attributes -> attributes.put("name", "User"));
}
