package com.sobekcore.workflow.execution.condition;

import com.sobekcore.workflow.process.step.condition.state.ConditionState;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ConditionCompleteDto(
    @NotNull
    UUID executionId,

    ConditionState state
) {
}
