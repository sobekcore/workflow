package com.sobekcore.workflow.process.step.condition;

import com.sobekcore.workflow.process.step.condition.metadata.*;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ConditionTest {
    @Test
    void shouldReturnMetadata() {
        Map<ConditionType, Class<? extends ConditionMetadata>> cases = new HashMap<>();
        cases.put(ConditionType.NONE, ConditionNone.class);
        cases.put(ConditionType.VISIT, ConditionVisit.class);
        cases.put(ConditionType.RADIO, ConditionRadio.class);
        cases.put(ConditionType.CHECKBOX, ConditionCheckbox.class);

        for (ConditionType conditionType : ConditionType.values()) {
            assertEquals(cases.get(conditionType), Condition.getMetadata(conditionType).getClass());
        }
    }
}
