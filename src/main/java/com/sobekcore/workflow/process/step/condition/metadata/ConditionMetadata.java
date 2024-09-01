package com.sobekcore.workflow.process.step.condition.metadata;

import com.sobekcore.workflow.process.step.condition.state.ConditionState;

public interface ConditionMetadata {
    boolean isConditionReady(ConditionState state);
}
