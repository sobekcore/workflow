package com.sobekcore.workflow.execution.condition;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.Execution;
import com.sobekcore.workflow.execution.ExecutionRepository;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.step.ProcessStep;
import com.sobekcore.workflow.process.step.condition.Condition;
import com.sobekcore.workflow.process.step.condition.ConditionType;
import com.sobekcore.workflow.process.step.condition.state.ConditionState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ConditionServiceTest {
    @Mock
    ExecutionRepository executionRepository;

    ConditionService conditionService;

    User user;

    Execution execution;

    @BeforeEach
    void setup() {
        conditionService = new ConditionService(executionRepository);
        user = new User("user@test.com", "User");
        Process process = new Process(user, "Process");
        ProcessStep processStep = new ProcessStep(
            user,
            "Process Step",
            "Description",
            new Condition(ConditionType.VISIT, null),
            null,
            Collections.emptyList(),
            process
        );
        execution = new Execution(user, process, processStep);
    }

    @Test
    void shouldCompleteConditions() {
        ConditionState conditionState = new ConditionState(true, null, null);
        ConditionCompleteDto conditionCompleteDto = new ConditionCompleteDto(execution.getId(), conditionState);

        when(executionRepository.findByUserAndId(user, execution.getId()))
            .thenReturn(Optional.of(execution));

        conditionService.complete(user, List.of(conditionCompleteDto));

        assertEquals(conditionState, execution.getConditionState());
        assertEquals(ConditionStatus.COMPLETED, execution.getConditionStatus());
    }
}
