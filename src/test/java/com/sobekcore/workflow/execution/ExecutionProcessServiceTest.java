package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.step.ProcessStep;
import com.sobekcore.workflow.process.step.condition.Condition;
import com.sobekcore.workflow.process.step.condition.ConditionType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExecutionProcessServiceTest {
    @Mock
    ExecutionRepository executionRepository;

    ExecutionProcessService executionProcessService;

    User user;

    Process process;

    ProcessStep processStep;

    Execution execution;

    @BeforeEach
    void setup() {
        executionProcessService = new ExecutionProcessService(executionRepository);
        user = new User("user@test.com", "User");
        process = new Process(user, "Process");
        processStep = new ProcessStep(
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
    void shouldReturnFalseWhenExecutionDoesntExists() {
        when(executionRepository.findByUserAndProcessInAndProcessStepNotNull(user, List.of(process)))
            .thenReturn(Optional.empty());

        assertFalse(executionProcessService.isExecutionExists(user, List.of(process)));
    }

    @Test
    void shouldReturnTrueWhenExecutionExists() {
        when(executionRepository.findByUserAndProcessInAndProcessStepNotNull(user, List.of(process)))
            .thenReturn(Optional.of(execution));

        assertTrue(executionProcessService.isExecutionExists(user, List.of(process)));
    }

    @Test
    void shouldReturnFalseWhenExecutionDoesntExistsForSteps() {
        when(executionRepository.findByUserAndProcessInAndProcessStepNotNull(user, List.of(process)))
            .thenReturn(Optional.empty());

        assertFalse(executionProcessService.isExecutionExistsForSteps(user, List.of(processStep)));
    }

    @Test
    void shouldReturnTrueWhenExecutionExistsForSteps() {
        when(executionRepository.findByUserAndProcessInAndProcessStepNotNull(user, List.of(process)))
            .thenReturn(Optional.of(execution));

        assertTrue(executionProcessService.isExecutionExistsForSteps(user, List.of(processStep)));
    }
}
