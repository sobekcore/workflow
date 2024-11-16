package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.execution.condition.ConditionStatus;
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
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConditionStatus conditionStatus;

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
        this.process = process;
        this.processStep = processStep;
        conditionStatus = determineConditionStatus();
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

    public ConditionStatus getConditionStatus() {
        return conditionStatus;
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

    public Execution setConditionStatus(ConditionStatus conditionStatus) {
        this.conditionStatus = conditionStatus;

        return this;
    }

    public Execution setConditionState(ConditionState conditionState) {
        this.conditionState = conditionState;
        this.conditionStatus = determineConditionStatus();

        return this;
    }

    public Execution setProcessStep(ProcessStep processStep) {
        this.processStep = processStep;
        conditionState = null;
        conditionStatus = determineConditionStatus();

        return this;
    }

    public ProcessStep findNextProcessStep(ProcessStep processStepToChoose) {
        List<ProcessStep> processStepList = process
            .getSteps()
            .stream()
            .filter(processStep -> getProcessStep().equals(processStep.getPrevProcessStep()))
            .toList();

        if (processStepList.isEmpty()) {
            return null;
        }

        if (processStepList.size() > 1) {
            if (processStepToChoose != null) {
                return processStepList
                    .stream()
                    .filter(processStep -> processStep.equals(processStepToChoose))
                    .findFirst()
                    .orElseThrow();
            }

            throw new ExecutionCantDetermineNextProcessStepException();
        }

        return processStepList.get(0);
    }

    private ConditionStatus determineConditionStatus() {
        return processStep == null || Condition
            .getMetadata(processStep.getCondition().getType())
            .isConditionReady(conditionState)
                ? ConditionStatus.COMPLETED
                : ConditionStatus.IN_PROGRESS;
    }
}
