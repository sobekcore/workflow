package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.condition.ConditionStatus;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.ProcessRepository;
import com.sobekcore.workflow.process.step.ProcessStep;
import com.sobekcore.workflow.process.step.ProcessStepRepository;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExecutionServiceTest {
    @Mock
    ExecutionRepository executionRepository;

    @Mock
    ProcessRepository processRepository;

    @Mock
    ProcessStepRepository processStepRepository;

    ExecutionService executionService;

    User user;

    Process process;

    ProcessStep processStep;

    ProcessStep chooseProcessStep;

    Execution execution;

    @BeforeEach
    void setup() {
        executionService = new ExecutionService(executionRepository, processRepository, processStepRepository);
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
        chooseProcessStep = new ProcessStep(
            user,
            "Choose Process Step",
            "Description",
            new Condition(ConditionType.NONE, null),
            processStep,
            List.of(processStep),
            process
        );
        execution = new Execution(user, process, processStep);
    }

    @Test
    void shouldReturnCreatedExecutions() {
        ExecutionDto executionDto = new ExecutionDto(process.getId(), processStep.getId());

        when(processRepository.findAllByUserAndIdIn(user, List.of(process.getId())))
            .thenReturn(List.of(process));
        when(processStepRepository.findByUserAndId(user, processStep.getId()))
            .thenReturn(Optional.of(processStep));
        when(executionRepository.saveAll(anyList()))
            .then(returnsFirstArg());

        Execution execution = executionService.create(user, List.of(executionDto)).get(0);

        assertEquals(executionDto.getProcessId(), execution.getProcess().getId());
        assertEquals(executionDto.getProcessStepId(), execution.getProcessStep().getId());
    }

    @Test
    void shouldReturnReadExecutions() {
        when(executionRepository.findAllByUser(user))
            .thenReturn(List.of(execution));

        List<Execution> executions = executionService.read(user);

        assertEquals(List.of(execution), executions);
    }

    @Test
    void shouldProgressExecutions() {
        ExecutionProgressDto executionProgressDto = new ExecutionProgressDto(
            execution.getId(),
            chooseProcessStep.getId()
        );

        process.getSteps().addAll(List.of(processStep, chooseProcessStep));

        when(executionRepository.findAllByUserAndIdAndConditionStatusInAndProcessStepNotNull(eq(user), eq(execution.getId()), anyList()))
            .thenReturn(List.of(execution));
        when(processStepRepository.getReferenceById(chooseProcessStep.getId()))
            .thenReturn(chooseProcessStep);

        executionService.progress(user, List.of(executionProgressDto));

        assertEquals(chooseProcessStep.getId(), execution.getProcessStep().getId());
    }

    @Test
    void shouldSetConditionStatusToChooseWhenCantDetermineNextProcessStep() {
        ProcessStep chooseAnotherProcessStep = new ProcessStep(
            user,
            "Choose Another Process Step",
            "Description",
            new Condition(ConditionType.NONE, null),
            processStep,
            List.of(processStep),
            process
        );
        ExecutionProgressDto executionProgressDto = new ExecutionProgressDto(
            execution.getId(),
            null
        );

        process.getSteps().addAll(List.of(processStep, chooseProcessStep, chooseAnotherProcessStep));

        when(executionRepository.findAllByUserAndIdAndConditionStatusInAndProcessStepNotNull(eq(user), eq(execution.getId()), anyList()))
            .thenReturn(List.of(execution));

        executionService.progress(user, List.of(executionProgressDto));

        assertEquals(ConditionStatus.CHOOSE, execution.getConditionStatus());
    }
}
