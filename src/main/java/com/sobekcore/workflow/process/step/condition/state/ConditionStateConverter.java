package com.sobekcore.workflow.process.step.condition.state;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class ConditionStateConverter implements AttributeConverter<ConditionState, String> {
    private final ObjectMapper objectMapper;

    public ConditionStateConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public String convertToDatabaseColumn(ConditionState state) {
        if (state == null) {
            return null;
        }

        try {
            return objectMapper.writeValueAsString(state);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }

    @Override
    public ConditionState convertToEntityAttribute(String state) {
        if (state == null) {
            return null;
        }

        try {
            return objectMapper.readValue(state, ConditionState.class);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }
}
