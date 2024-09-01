package com.sobekcore.workflow.process.step.condition.metadata;

import com.sobekcore.workflow.process.step.condition.state.ConditionState;
import com.sobekcore.workflow.process.step.condition.ConditionType;

@Metadata(ConditionType.CHECKBOX)
public class ConditionCheckbox implements ConditionMetadata {
    @Override
    public boolean isConditionReady(ConditionState state) {
        return state != null && state.getOptions() != null && !state.getOptions().isEmpty();
    }
}
