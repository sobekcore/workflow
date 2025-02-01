package com.sobekcore.workflow.process;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.Execution;
import com.sobekcore.workflow.process.step.ProcessStep;
import com.sobekcore.workflow.process.step.condition.Condition;
import com.sobekcore.workflow.process.step.condition.ConditionType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ProcessTest {
    Process process;

    Execution execution;

    @BeforeEach
    void setup() {
        User user = new User("user@test.com", "User");
        process = new Process(user, "Process");
        ProcessStep processStep = new ProcessStep(
            user,
            "Process Step",
            "Description",
            new Condition(ConditionType.NONE, null),
            null,
            Collections.emptyList(),
            process
        );
        execution = new Execution(user, process, processStep);
    }

    @Test
    void shouldReturnFalseIfIsNotEditable() {
        ReflectionTestUtils.setField(process, "executions", List.of(execution));

        assertFalse(process.isEditable());
    }

    @Test
    void shouldReturnTrueIfIsEditable() {
        execution.setProcessStep(null);
        ReflectionTestUtils.setField(process, "executions", List.of(execution));

        assertTrue(process.isEditable());
    }
}
