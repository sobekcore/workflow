package com.sobekcore.workflow.process.step.condition.radio;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class ConditionDataRadioConverter implements AttributeConverter<ConditionDataRadio, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(ConditionDataRadio conditionDataRadio) {
        if (conditionDataRadio == null) {
            return null;
        }

        try {
            return objectMapper.writeValueAsString(conditionDataRadio);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    @Override
    public ConditionDataRadio convertToEntityAttribute(String conditionDataRadio) {
        if (conditionDataRadio == null) {
            return null;
        }

        try {
            return objectMapper.readValue(conditionDataRadio, ConditionDataRadio.class);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}
