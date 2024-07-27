package com.sobekcore.workflow.process.step.condition.visit;

import jakarta.validation.constraints.NotBlank;

public class ConditionDataVisit {
    @NotBlank
    private String link;

    public String getLink() {
        return link;
    }
}
