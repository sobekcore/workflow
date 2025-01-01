package com.sobekcore.workflow.process.step;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.ProcessNotFoundException;
import com.sobekcore.workflow.process.ProcessRepository;
import com.sobekcore.workflow.process.step.condition.Condition;
import com.sobekcore.workflow.process.step.condition.ConditionType;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProcessStepServiceTest {
    @Mock
    ProcessRepository processRepository;

    @Mock
    ProcessStepRepository processStepRepository;

    ProcessStepService processStepService;

    User user;

    Process process;

    ProcessStep processStep;

    ProcessStepDto processStepDto;

    @BeforeEach
    void setup() {
        processStepService = new ProcessStepService(processRepository, processStepRepository);
        user = new User("user@test.com", "User");
        process = new Process(user, "Process");
        processStep = new ProcessStep(
            user,
            "Process Step",
            "Description",
            new Condition(ConditionType.NONE, null),
            null,
            new ArrayList<>(),
            process
        );
        processStepDto = new ProcessStepDto(
            "Process Step",
            "Description",
            new Condition(ConditionType.NONE, null),
            processStep.getId(),
            List.of(processStep.getId()),
            process.getId()
        );
    }

    @Test
    void shouldReturnCreatedProcessesSteps() {
        when(processRepository.findByUserAndId(user, process.getId()))
            .thenReturn(Optional.of(process));
        when(processStepRepository.findByUserAndId(user, processStep.getId()))
            .thenReturn(Optional.of(processStep));
        when(processStepRepository.findAllByUserAndIdIn(user, List.of(processStep.getId())))
            .thenReturn(List.of(processStep));
        when(processStepRepository.saveAll(anyList()))
            .then(returnsFirstArg());

        ProcessStep processStep = processStepService.create(user, List.of(processStepDto)).get(0);

        assertEquals(processStepDto.getName(), processStep.getName());
        assertEquals(processStepDto.getDescription(), processStep.getDescription());
        assertEquals(processStepDto.getCondition(), processStep.getCondition());
        assertEquals(processStepDto.getPrevProcessStepId(), processStep.getPrevProcessStep().getId());
        assertEquals(processStepDto.getFromProcessStepsIds(), processStep
            .getAvailableFrom()
            .stream()
            .map(ProcessStep::getId)
            .toList()
        );
        assertEquals(processStepDto.getProcessId(), processStep.getProcess().getId());
    }

    @Test
    void shouldThrowExceptionWhenProcessNotFound() {
        when(processRepository.findByUserAndId(user, process.getId()))
            .thenThrow(new JpaObjectRetrievalFailureException(new EntityNotFoundException()));

        assertThrows(
            ProcessNotFoundException.class,
            () -> processStepService.create(user, List.of(processStepDto))
        );
    }

    @Test
    void shouldReturnReadProcessesSteps() {
        when(processStepRepository.findAllByUser(user))
            .thenReturn(List.of(processStep));

        ProcessStepService processStepService = new ProcessStepService(processRepository, processStepRepository);
        List<ProcessStep> processesSteps = processStepService.read(user);

        assertEquals(List.of(processStep), processesSteps);
    }

    @Test
    void shouldAssignProcessesSteps() {
        ProcessStep assignProcessStep = new ProcessStep(
            user,
            "Assign Process Step",
            "Description",
            new Condition(ConditionType.NONE, null),
            processStep,
            List.of(processStep),
            process
        );
        ProcessStepAssignDto processStepAssignDto = new ProcessStepAssignDto(
            processStep.getId(),
            assignProcessStep.getId()
        );

        when(processStepRepository.findByUserAndId(user, processStep.getId()))
            .thenReturn(Optional.of(processStep));
        when(processStepRepository.findByUserAndId(user, assignProcessStep.getId()))
            .thenReturn(Optional.of(assignProcessStep));

        processStepService.assign(user, List.of(processStepAssignDto));

        assertEquals(List.of(assignProcessStep), processStep.getAvailableFrom());
    }
}
