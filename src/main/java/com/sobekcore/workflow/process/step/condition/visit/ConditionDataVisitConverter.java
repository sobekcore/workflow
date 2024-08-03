package com.sobekcore.workflow.process.step.condition.visit;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class ConditionDataVisitConverter implements AttributeConverter<ConditionDataVisit, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(ConditionDataVisit conditionDataVisit) {
        if (conditionDataVisit == null) {
            return null;
        }

        try {
            return objectMapper.writeValueAsString(conditionDataVisit);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }

    @Override
    public ConditionDataVisit convertToEntityAttribute(String conditionDataVisit) {
        if (conditionDataVisit == null) {
            return null;
        }

        try {
            return objectMapper.readValue(conditionDataVisit, ConditionDataVisit.class);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }
}
