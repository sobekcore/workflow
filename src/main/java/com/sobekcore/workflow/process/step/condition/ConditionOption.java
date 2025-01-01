package com.sobekcore.workflow.process.step.condition;

import jakarta.validation.constraints.NotBlank;

public record ConditionOption(
    @NotBlank
    String label,

    @NotBlank
    String value
) {
}
