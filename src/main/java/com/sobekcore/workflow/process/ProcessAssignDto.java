package com.sobekcore.workflow.process;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class ProcessAssignDto {
    @NotNull
    private UUID processId;

    @NotNull
    private UUID processStepId;

    @NotNull
    private UUID assignProcessStepId;

    public UUID getProcessId() {
        return processId;
    }

    public UUID getProcessStepId() {
        return processStepId;
    }

    public UUID getAssignProcessStepId() {
        return assignProcessStepId;
    }
}
