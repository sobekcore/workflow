package com.sobekcore.workflow.execution.condition.radio;

import com.sobekcore.workflow.process.step.condition.ConditionOption;
import jakarta.validation.constraints.NotNull;

public class ConditionStateRadio {
    @NotNull
    private ConditionOption option;

    public ConditionOption getOption() {
        return option;
    }
}
