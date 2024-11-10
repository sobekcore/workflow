package com.sobekcore.workflow.process.step.condition.state;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sobekcore.workflow.utils.JsonConverter;

public class ConditionStateConverter extends JsonConverter<ConditionState> {
    public ConditionStateConverter(ObjectMapper objectMapper) {
        super(objectMapper, ConditionState.class);
    }
}
