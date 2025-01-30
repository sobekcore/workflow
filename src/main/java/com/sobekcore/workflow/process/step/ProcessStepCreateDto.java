package com.sobekcore.workflow.process.step;

import com.sobekcore.workflow.process.step.condition.Condition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record ProcessStepCreateDto(
    @NotBlank
    String name,

    String description,

    @NotNull
    Condition condition,

    UUID prevProcessStepId,

    List<UUID> fromProcessStepsIds,

    @NotNull
    UUID processId
) {
}
