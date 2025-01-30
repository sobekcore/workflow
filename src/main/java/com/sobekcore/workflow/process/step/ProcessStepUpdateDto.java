package com.sobekcore.workflow.process.step;

import com.sobekcore.workflow.process.step.condition.Condition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ProcessStepUpdateDto(
    @NotNull
    UUID id,

    @NotBlank
    String name,

    String description,

    @NotNull
    Condition condition
) {
}
