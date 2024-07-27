package com.sobekcore.workflow.process.step.condition;

import jakarta.validation.constraints.NotBlank;

public class ConditionOption {
    @NotBlank
    private String label;

    public String getLabel() {
        return label;
    }
}
