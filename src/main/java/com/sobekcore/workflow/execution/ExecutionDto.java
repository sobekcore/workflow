package com.sobekcore.workflow.execution;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class ExecutionDto {
    @NotNull
    private UUID processId;

    @NotNull
    private UUID processStepId;

    public ExecutionDto(UUID processId, UUID processStepId) {
        this.processId = processId;
        this.processStepId = processStepId;
    }

    public UUID getProcessId() {
        return processId;
    }

    public UUID getProcessStepId() {
        return processStepId;
    }
}
