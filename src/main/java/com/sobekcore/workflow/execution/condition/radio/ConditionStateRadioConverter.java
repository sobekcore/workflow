package com.sobekcore.workflow.execution.condition.radio;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class ConditionStateRadioConverter implements AttributeConverter<ConditionStateRadio, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(ConditionStateRadio conditionStateRadio) {
        if (conditionStateRadio == null) {
            return null;
        }

        try {
            return objectMapper.writeValueAsString(conditionStateRadio);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }

    @Override
    public ConditionStateRadio convertToEntityAttribute(String conditionStateRadio) {
        if (conditionStateRadio == null) {
            return null;
        }

        try {
            return objectMapper.readValue(conditionStateRadio, ConditionStateRadio.class);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }
}
