package com.sobekcore.workflow.process.step.condition.radio;

import com.sobekcore.workflow.process.step.condition.ConditionOption;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class ConditionDataRadio {
    @NotBlank
    private List<ConditionOption> options;

    public List<ConditionOption> getOptions() {
        return options;
    }
}
