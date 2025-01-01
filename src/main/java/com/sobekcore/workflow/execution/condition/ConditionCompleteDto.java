package com.sobekcore.workflow.execution.condition;

import com.sobekcore.workflow.process.step.condition.state.ConditionState;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class ConditionCompleteDto {
    @NotNull
    private UUID executionId;

    private ConditionState state;

    public ConditionCompleteDto(UUID executionId, ConditionState state) {
        this.executionId = executionId;
        this.state = state;
    }

    public UUID getExecutionId() {
        return executionId;
    }

    public ConditionState getState() {
        return state;
    }
}
