package com.sobekcore.workflow.process.step;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class ProcessStepAssignDto {
    @NotNull
    private UUID processStepId;

    @NotNull
    private UUID assignProcessStepId;

    public ProcessStepAssignDto(UUID processStepId, UUID assignProcessStepId) {
        this.processStepId = processStepId;
        this.assignProcessStepId = assignProcessStepId;
    }

    public UUID getProcessStepId() {
        return processStepId;
    }

    public UUID getAssignProcessStepId() {
        return assignProcessStepId;
    }
}
