package com.sobekcore.workflow.process.step;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ProcessStepAssignDto(
    @NotNull
    UUID processStepId,

    @NotNull
    UUID assignProcessStepId
) {
}
