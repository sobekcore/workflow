package com.sobekcore.workflow.execution;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ExecutionDto(
    @NotNull
    UUID processId,

    @NotNull
    UUID processStepId
) {
}
