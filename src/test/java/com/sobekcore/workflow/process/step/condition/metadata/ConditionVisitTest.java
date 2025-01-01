package com.sobekcore.workflow.process.step.condition.metadata;

import com.sobekcore.workflow.process.step.condition.state.ConditionState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ConditionVisitTest {
    ConditionVisit conditionVisit;

    @BeforeEach
    void setup() {
        conditionVisit = new ConditionVisit();
    }

    @Test
    void shouldReturnFalseIfConditionIsNotReady() {
        assertFalse(conditionVisit.isConditionReady(null));
        assertFalse(conditionVisit.isConditionReady(
            new ConditionState(null, null, null)
        ));
        assertFalse(conditionVisit.isConditionReady(
            new ConditionState(false, null, null)
        ));
    }

    @Test
    void shouldReturnTrueIfConditionIsReady() {
        assertTrue(conditionVisit.isConditionReady(
            new ConditionState(true, null, null)
        ));
    }
}
