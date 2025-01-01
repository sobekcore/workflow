package com.sobekcore.workflow.process.step.condition;

import java.util.List;

public record ConditionData(
    String link,

    List<ConditionOption> options
) {
}
