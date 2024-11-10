package com.sobekcore.workflow.process.step.condition;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sobekcore.workflow.utils.JsonConverter;

public class ConditionConverter extends JsonConverter<Condition> {
    public ConditionConverter(ObjectMapper objectMapper) {
        super(objectMapper, Condition.class);
    }
}
