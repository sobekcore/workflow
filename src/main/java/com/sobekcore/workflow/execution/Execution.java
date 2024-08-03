package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.execution.condition.radio.ConditionStateRadio;
import com.sobekcore.workflow.execution.condition.radio.ConditionStateRadioConverter;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.step.ProcessStep;
import com.sobekcore.workflow.process.step.ProcessStepNotPartOfProcessException;
import com.sobekcore.workflow.process.step.condition.ConditionType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Internal;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table
public class Execution {
    @Id
    private UUID id;

    @NotNull
    @Column(nullable = false)
    private Date createdAt;

    @NotNull
    @Column(nullable = false)
    private boolean conditionCompleted;

    @Convert(converter = ConditionStateRadioConverter.class)
    private ConditionStateRadio conditionStateRadio;

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
        createdAt = new Date();
        conditionCompleted = processStep.getConditionType() == ConditionType.NONE;
        this.process = process;
        this.processStep = processStep;
    }

    @Internal
    protected Execution() {
    }

    public UUID getId() {
        return id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public boolean isConditionCompleted() {
        return conditionCompleted;
    }

    public ConditionStateRadio getConditionStateRadio() {
        return conditionStateRadio;
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

    public boolean isConditionReady() {
        if (getProcessStep() != null && getProcessStep().getConditionType() == ConditionType.RADIO) {
            return getConditionStateRadio().getOption() != null;
        }

        return true;
    }

    public Execution setConditionCompleted(boolean conditionCompleted) {
        this.conditionCompleted = isConditionReady() && conditionCompleted;

        return this;
    }

    public Execution setConditionState(ConditionStateRadio conditionStateRadio) {
        if (getProcessStep() != null && getProcessStep().getConditionType() == ConditionType.RADIO) {
            this.conditionStateRadio = conditionStateRadio;
        }

        return this;
    }

    public Execution setProcessStep(ProcessStep processStep) {
        conditionCompleted = processStep == null || processStep.getConditionType() == ConditionType.NONE;
        conditionStateRadio = null;
        this.processStep = processStep;

        return this;
    }
}
