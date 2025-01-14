package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.condition.ConditionStatus;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.step.ProcessStep;
import com.sobekcore.workflow.process.step.ProcessStepNotPartOfProcessException;
import com.sobekcore.workflow.process.step.condition.Condition;
import com.sobekcore.workflow.process.step.condition.ConditionType;
import com.sobekcore.workflow.process.step.condition.state.ConditionState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ExecutionTest {
    User user;

    Process process;

    ProcessStep processStep;

    Execution execution;

    @BeforeEach
    void setup() {
        user = new User("user@test.com", "User");
        process = new Process(user, "Process");
        processStep = new ProcessStep(
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
    void shouldThrowExceptionWhenProcessStepIsNotPartOfProcess() {
        ProcessStep anotherProcessStep = new ProcessStep(
            user,
            "Another Process Step",
            "Description",
            new Condition(ConditionType.VISIT, null),
            null,
            Collections.emptyList(),
            new Process(user, "Another Process")
        );

        assertThrows(
            ProcessStepNotPartOfProcessException.class,
            () -> new Execution(user, process, anotherProcessStep)
        );
    }

    @Test
    void shouldDetermineConditionStatusWhenSettingConditionState() {
        execution.setConditionState(new ConditionState(true, null, null));

        assertEquals(ConditionStatus.COMPLETED, execution.getConditionStatus());
    }

    @Test
    void shouldDetermineConditionStatusWhenSettingProcessStep() {
        execution.setProcessStep(null);

        assertEquals(ConditionStatus.COMPLETED, execution.getConditionStatus());
    }

    @Test
    void shouldRemoveConditionStateWhenSettingProcessStep() {
        execution.setConditionState(new ConditionState(true, null, null));
        execution.setProcessStep(null);

        assertNull(execution.getConditionState());
    }

    @Test
    void shouldReturnNullWhenNextStepsDoesntExist() {
        process.getSteps().add(processStep);

        assertNull(execution.findNextProcessStep(null));
    }

    @Test
    void shouldFindNextProcessStep() {
        ProcessStep nextProcessStep = new ProcessStep(
            user,
            "Next Process Step",
            "Description",
            new Condition(ConditionType.VISIT, null),
            processStep,
            List.of(processStep),
            process
        );

        process.getSteps().addAll(List.of(processStep, nextProcessStep));

        assertEquals(nextProcessStep, execution.findNextProcessStep(null));
    }

    @Test
    void shouldFindNextProcessStepWhenMultipleStepsAreFound() {
        ProcessStep nextProcessStep = new ProcessStep(
            user,
            "Next Process Step",
            "Description",
            new Condition(ConditionType.VISIT, null),
            processStep,
            List.of(processStep),
            process
        );
        ProcessStep nextAnotherProcessStep = new ProcessStep(
            user,
            "Next Another Process Step",
            "Description",
            new Condition(ConditionType.VISIT, null),
            processStep,
            List.of(processStep),
            process
        );

        process.getSteps().addAll(List.of(processStep, nextProcessStep, nextAnotherProcessStep));

        assertEquals(nextProcessStep, execution.findNextProcessStep(nextProcessStep));
    }

    @Test
    void shouldThrowExceptionWhenCantDetermineNextProcessStep() {
        ProcessStep nextProcessStep = new ProcessStep(
            user,
            "Next Process Step",
            "Description",
            new Condition(ConditionType.VISIT, null),
            processStep,
            List.of(processStep),
            process
        );
        ProcessStep nextAnotherProcessStep = new ProcessStep(
            user,
            "Next Another Process Step",
            "Description",
            new Condition(ConditionType.VISIT, null),
            processStep,
            List.of(processStep),
            process
        );

        process.getSteps().addAll(List.of(processStep, nextProcessStep, nextAnotherProcessStep));

        assertThrows(
            ExecutionCantDetermineNextProcessStepException.class,
            () -> execution.findNextProcessStep(null)
        );
    }
}
