package com.sobekcore.workflow.execution;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.step.ProcessStep;
import com.sobekcore.workflow.process.step.ProcessStepNotPartOfProcessException;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
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
    @ManyToOne
    @JoinColumn(nullable = false)
    private Process process;

    @ManyToOne
    private ProcessStep processStep;

    @Deprecated
    public Execution() {
    }

    public Execution(Process process, ProcessStep processStep) {
        if (!process.getId().equals(processStep.getProcess().getId())) {
            throw new ProcessStepNotPartOfProcessException();
        }

        this.id = UUID.randomUUID();
        this.createdAt = new Date();
        this.process = process;
        this.processStep = processStep;
    }

    public UUID getId() {
        return id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Process getProcess() {
        return process;
    }

    public ProcessStep getProcessStep() {
        return processStep;
    }

    @JsonIgnore
    public ProcessStep getNextProcessStep() {
        try {
            return getProcess()
                .getSteps()
                .get(getProcess()
                    .getSteps()
                    .indexOf(getProcessStep()) + 1
                );
        } catch (IndexOutOfBoundsException exception) {
            return null;
        }
    }

    public Execution setProcessStep(ProcessStep processStep) {
        this.processStep = processStep;
        return this;
    }
}
