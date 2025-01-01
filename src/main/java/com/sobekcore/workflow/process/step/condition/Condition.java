package com.sobekcore.workflow.process.step.condition;

import com.sobekcore.workflow.process.step.condition.metadata.ConditionMetadata;
import com.sobekcore.workflow.process.step.condition.metadata.Metadata;
import com.sobekcore.workflow.utils.AnnotationLoader;

public record Condition(
    ConditionType type,

    ConditionData data
) {
    public static ConditionMetadata getMetadata(ConditionType type) {
        return AnnotationLoader.load(Condition.class.getPackageName(), Metadata.class, type);
    }
}
