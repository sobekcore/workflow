package com.sobekcore.workflow.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sobekcore.workflow.process.step.condition.Condition;
import com.sobekcore.workflow.process.step.condition.ConditionType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JsonConverterTest {
    @Mock
    ObjectMapper objectMapper;

    JsonConverter<Condition> jsonConverter;

    Condition condition;

    static class TestConverter extends JsonConverter<Condition> {
        public TestConverter(ObjectMapper objectMapper) {
            super(objectMapper, Condition.class);
        }
    }

    @BeforeEach
    void setup() {
        jsonConverter = new TestConverter(objectMapper);
        condition = new Condition(ConditionType.NONE, null);
    }

    @Test
    void shouldConvertToDatabaseColumn() throws JsonProcessingException {
        jsonConverter.convertToDatabaseColumn(condition);

        verify(objectMapper, times(1))
            .writeValueAsString(condition);
    }

    @Test
    void shouldNotConvertToDatabaseColumnWhenValueIsNull() throws JsonProcessingException {
        assertNull(jsonConverter.convertToDatabaseColumn(null));

        verify(objectMapper, never())
            .writeValueAsString(condition);
    }

    @Test
    void shouldConvertToEntityAttribute() throws JsonProcessingException {
        jsonConverter.convertToEntityAttribute(condition.toString());

        verify(objectMapper, times(1))
            .readValue(condition.toString(), Condition.class);
    }

    @Test
    void shouldNotConvertToEntityAttributeWhenValueIsNull() throws JsonProcessingException {
        assertNull(jsonConverter.convertToEntityAttribute(null));

        verify(objectMapper, never())
            .readValue(condition.toString(), Condition.class);
    }
}
