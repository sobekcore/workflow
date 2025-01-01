package com.sobekcore.workflow.process.step.condition.metadata;

import com.sobekcore.workflow.process.step.condition.state.ConditionState;
import com.sobekcore.workflow.process.step.condition.ConditionType;

@Metadata(ConditionType.VISIT)
public class ConditionVisit implements ConditionMetadata {
    @Override
    public boolean isConditionReady(ConditionState state) {
        return state != null && state.visited() != null && state.visited();
    }
}
