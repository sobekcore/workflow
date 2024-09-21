package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.step.ProcessStep;
import com.sobekcore.workflow.process.step.ProcessStepNotPartOfProcessException;
import com.sobekcore.workflow.process.step.condition.Condition;
import com.sobekcore.workflow.process.step.condition.state.ConditionState;
import com.sobekcore.workflow.process.step.condition.state.ConditionStateConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Internal;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Entity
@Table
public class Execution {
    @Id
    private UUID id;

    @NotNull
    @Column(nullable = false)
    private Instant createdAt;

    @NotNull
    @Column(nullable = false)
    private boolean conditionCompleted;

    @Convert(converter = ConditionStateConverter.class)
    private ConditionState conditionState;

    @NotNull
    @ManyToOne
    @JoinColumn(nullable = false)
    private Process process;

    @ManyToOne
    private ProcessStep processStep;

    public Execution(Process process, ProcessStep processStep) {
        if (!process.getId().equals(processStep.getProcess().getId())) {
            throw new ProcessStepNotPartOfProcessException();
        }

        id = UUID.randomUUID();
        createdAt = Instant.now();
        conditionCompleted = Condition
            .getMetadata(processStep.getCondition().getType())
            .isConditionReady(conditionState);
        this.process = process;
        this.processStep = processStep;
    }

    @Internal
    protected Execution() {
    }

    public UUID getId() {
        return id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public boolean isConditionCompleted() {
        return conditionCompleted;
    }

    public ConditionState getConditionState() {
        return conditionState;
    }

    public Process getProcess() {
        return process;
    }

    public ProcessStep getProcessStep() {
        return processStep;
    }

    public ProcessStep getNextProcessStep() {
        List<ProcessStep> processStepList = getProcess()
            .getSteps()
            .stream()
            .sorted(Comparator.comparing(ProcessStep::getCreatedAt))
            .toList();

        try {
            return processStepList.get(processStepList.indexOf(getProcessStep()) + 1);
        } catch (IndexOutOfBoundsException exception) {
            return null;
        }
    }

    public Execution setConditionCompleted(boolean conditionCompleted) {
        this.conditionCompleted = conditionCompleted && Condition
            .getMetadata(getProcessStep().getCondition().getType())
            .isConditionReady(conditionState);

        return this;
    }

    public Execution setConditionState(ConditionState conditionState) {
        this.conditionState = conditionState;

        return this;
    }

    public Execution setProcessStep(ProcessStep processStep) {
        conditionCompleted = processStep == null || Condition
            .getMetadata(processStep.getCondition().getType())
            .isConditionReady(conditionState);
        conditionState = null;
        this.processStep = processStep;

        return this;
    }
}
