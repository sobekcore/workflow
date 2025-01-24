package com.sobekcore.workflow;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerTypePredicate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
class WebConfig implements WebMvcConfigurer {
    @Value("${workflow.api.prefix}")
    private String workflowApiPrefix;

    @Value("${workflow.client.url}")
    private String workflowClientUrl;

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix(
            workflowApiPrefix,
            HandlerTypePredicate.forAnnotation(RestController.class)
        );
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/**")
            .allowedOrigins(workflowClientUrl)
            .allowedMethods("*")
            .allowCredentials(true);
    }
}
