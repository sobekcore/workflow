package com.sobekcore.workflow.process.step.condition.state;

import com.sobekcore.workflow.process.step.condition.ConditionOption;

import java.util.List;

public record ConditionState(
    Boolean visited,

    ConditionOption option,

    List<ConditionOption> options
) {
}
