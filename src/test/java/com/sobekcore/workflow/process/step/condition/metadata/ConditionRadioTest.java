package com.sobekcore.workflow.process.step.condition.metadata;

import com.sobekcore.workflow.process.step.condition.ConditionOption;
import com.sobekcore.workflow.process.step.condition.state.ConditionState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ConditionRadioTest {
    ConditionRadio conditionRadio;
    
    @BeforeEach
    void setup() {
        conditionRadio = new ConditionRadio();        
    }

    @Test
    void shouldReturnFalseIfConditionIsNotReady() {
        assertFalse(conditionRadio.isConditionReady(null));
        assertFalse(conditionRadio.isConditionReady(
            new ConditionState(null, null, null)
        ));
    }

    @Test
    void shouldReturnTrueIfConditionIsReady() {
        assertTrue(conditionRadio.isConditionReady(
            new ConditionState(null, new ConditionOption("Label", "Value"), null)
        ));
    }
}
