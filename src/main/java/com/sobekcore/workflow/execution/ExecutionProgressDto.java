package com.sobekcore.workflow.execution;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ExecutionProgressDto(
    @NotNull
    UUID executionId,

    UUID chooseProcessStepId
) {
}
