package com.sobekcore.workflow.execution.condition;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class ConditionCompleteDto {
    @NotNull
    private UUID executionId;

    public UUID getExecutionId() {
        return executionId;
    }
}
