package com.sobekcore.workflow.process.step.condition;

import com.sobekcore.workflow.process.step.condition.metadata.ConditionMetadata;
import com.sobekcore.workflow.process.step.condition.metadata.Metadata;
import com.sobekcore.workflow.utils.AnnotationLoader;

public class Condition {
    private ConditionType type;

    private ConditionData data;

    public ConditionType getType() {
        return type;
    }

    public ConditionData getData() {
        return data;
    }

    public static ConditionMetadata getMetadata(ConditionType type) {
        return AnnotationLoader.load(Condition.class.getPackageName(), Metadata.class, type);
    }
}
