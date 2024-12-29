package com.sobekcore.workflow;

import com.sobekcore.workflow.auth.AuthSuccessHandler;
import com.sobekcore.workflow.auth.user.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfig {
    @Value("${workflow.client.url}")
    private String workflowClientUrl;

    private final UserRepository userRepository;

    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        BasicAuthenticationEntryPoint entryPoint = new BasicAuthenticationEntryPoint();
        entryPoint.setRealmName("Workflow");

        return http
            .httpBasic(basic -> basic
                .authenticationEntryPoint(entryPoint)
            )
            .csrf(AbstractHttpConfigurer::disable)
            .oauth2Login(oauth2 -> oauth2
                .successHandler(new AuthSuccessHandler(workflowClientUrl, userRepository))
            )
            .logout(logout -> logout
                .logoutSuccessUrl(workflowClientUrl)
            )
            .build();
    }
}
