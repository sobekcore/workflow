package com.sobekcore.workflow.execution;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class ExecutionProgressDto {
    @NotNull
    private UUID executionId;

    private UUID chooseProcessStepId;

    public UUID getExecutionId() {
        return executionId;
    }

    public UUID getChooseProcessStepId() {
        return chooseProcessStepId;
    }
}
