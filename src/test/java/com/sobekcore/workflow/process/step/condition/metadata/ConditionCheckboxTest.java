package com.sobekcore.workflow.process.step.condition.metadata;

import com.sobekcore.workflow.process.step.condition.ConditionOption;
import com.sobekcore.workflow.process.step.condition.state.ConditionState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ConditionCheckboxTest {
    ConditionCheckbox conditionCheckbox;

    @BeforeEach
    void setup() {
        conditionCheckbox = new ConditionCheckbox();
    }

    @Test
    void shouldReturnFalseIfConditionIsNotReady() {
        assertFalse(conditionCheckbox.isConditionReady(null));
        assertFalse(conditionCheckbox.isConditionReady(
            new ConditionState(null, null, null)
        ));
        assertFalse(conditionCheckbox.isConditionReady(
            new ConditionState(null, null, Collections.emptyList())
        ));
    }

    @Test
    void shouldReturnTrueIfConditionIsReady() {
        assertTrue(conditionCheckbox.isConditionReady(
            new ConditionState(null, null, List.of(new ConditionOption("Label", "Value")))
        ));
    }
}
