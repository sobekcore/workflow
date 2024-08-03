package com.sobekcore.workflow.execution.condition;

import com.sobekcore.workflow.execution.condition.radio.ConditionStateRadio;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class ConditionCompleteDto {
    @NotNull
    private UUID executionId;

    private ConditionStateRadio conditionStateRadio;

    public UUID getExecutionId() {
        return executionId;
    }

    public ConditionStateRadio getConditionStateRadio() {
        return conditionStateRadio;
    }
}
