package com.sobekcore.workflow.process.step;

import com.sobekcore.workflow.process.step.condition.radio.ConditionDataRadio;
import com.sobekcore.workflow.process.step.condition.visit.ConditionDataVisit;
import com.sobekcore.workflow.process.step.condition.ConditionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class ProcessStepDto {
    @NotBlank
    private String name;

    private String description;

    @NotNull
    private ConditionType conditionType;

    private ConditionDataVisit conditionDataVisit;

    private ConditionDataRadio conditionDataRadio;

    @NotNull
    private UUID processId;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public ConditionType getConditionType() {
        return conditionType;
    }

    public ConditionDataVisit getConditionDataVisit() {
        return conditionDataVisit;
    }

    public ConditionDataRadio getConditionDataRadio() {
        return conditionDataRadio;
    }

    public UUID getProcessId() {
        return processId;
    }
}
