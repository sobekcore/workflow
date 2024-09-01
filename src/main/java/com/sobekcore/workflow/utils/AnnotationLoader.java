package com.sobekcore.workflow.utils;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.context.annotation.ScannedGenericBeanDefinition;
import org.springframework.core.type.filter.AnnotationTypeFilter;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Optional;

public class AnnotationLoader {
    private static final HashMap<String, Object> instances = new HashMap<>();

    public static <T, R> R load(String basePackage, Class<? extends Annotation> annotationType, T value) {
        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(true);
        scanner.addIncludeFilter(new AnnotationTypeFilter(annotationType));

        try {
            for (BeanDefinition definition : scanner.findCandidateComponents(basePackage)) {
                ScannedGenericBeanDefinition bean = (ScannedGenericBeanDefinition) definition;
                Optional<Object> annotationValue = bean
                    .getMetadata()
                    .getAnnotations()
                    .get(annotationType)
                    .getValue("value");

                if (annotationValue.isEmpty() || annotationValue.get() != value) {
                    continue;
                }

                String key = String.format("%s-%s", annotationType.getName(), annotationValue.get());
                if (!instances.containsKey(key)) {
                    instances.put(key, Class.forName(bean.getBeanClassName()).getConstructor().newInstance());
                }

                return (R) instances.get(key);
            }

            return null;
        } catch (
            ClassNotFoundException |
            InvocationTargetException |
            InstantiationException |
            IllegalAccessException |
            NoSuchMethodException exception
        ) {
            return null;
        }
    }
}
