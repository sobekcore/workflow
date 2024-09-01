package com.sobekcore.workflow.process.step.condition.metadata;

import com.sobekcore.workflow.process.step.condition.state.ConditionState;
import com.sobekcore.workflow.process.step.condition.ConditionType;

@Metadata(ConditionType.RADIO)
public class ConditionRadio implements ConditionMetadata {
    @Override
    public boolean isConditionReady(ConditionState state) {
        return state != null && state.getOption() != null;
    }
}
