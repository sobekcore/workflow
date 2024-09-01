package com.sobekcore.workflow.process.step.condition.metadata;

import com.sobekcore.workflow.process.step.condition.ConditionType;
import com.sobekcore.workflow.process.step.condition.state.ConditionState;

@Metadata(ConditionType.NONE)
public class ConditionNone implements ConditionMetadata {
    @Override
    public boolean isConditionReady(ConditionState state) {
        return true;
    }
}
