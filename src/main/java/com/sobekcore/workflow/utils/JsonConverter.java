package com.sobekcore.workflow.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public abstract class JsonConverter<T> implements AttributeConverter<T, String> {
    private final ObjectMapper objectMapper;

    private final Class<T> valueType;

    public JsonConverter(ObjectMapper objectMapper, Class<T> valueType) {
        this.objectMapper = objectMapper;
        this.valueType = valueType;
    }

    @Override
    public String convertToDatabaseColumn(T value) {
        if (value == null) {
            return null;
        }

        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }

    @Override
    public T convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }

        try {
            return objectMapper.readValue(value, valueType);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }
}
