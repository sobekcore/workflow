package com.sobekcore.workflow.process.step.condition.metadata;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ConditionNoneTest {
    ConditionNone conditionNone;

    @BeforeEach
    void setup() {
        conditionNone = new ConditionNone();
    }

    @Test
    void shouldReturnTrue() {
        assertTrue(conditionNone.isConditionReady(null));
    }
}
