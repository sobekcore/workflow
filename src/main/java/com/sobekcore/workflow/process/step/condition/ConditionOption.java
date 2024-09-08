package com.sobekcore.workflow.process.step.condition;

import jakarta.validation.constraints.NotBlank;

public class ConditionOption {
    @NotBlank
    private String label;

    @NotBlank
    private String value;

    public String getLabel() {
        return label;
    }

    public String getValue() {
        return value;
    }
}
