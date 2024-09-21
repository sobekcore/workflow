package com.sobekcore.workflow.process.step.condition;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class ConditionConverter implements AttributeConverter<Condition, String> {
    private final ObjectMapper objectMapper;

    public ConditionConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public String convertToDatabaseColumn(Condition condition) {
        if (condition == null) {
            return null;
        }

        try {
            return objectMapper.writeValueAsString(condition);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }

    @Override
    public Condition convertToEntityAttribute(String condition) {
        if (condition == null) {
            return null;
        }

        try {
            return objectMapper.readValue(condition, Condition.class);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }
}
