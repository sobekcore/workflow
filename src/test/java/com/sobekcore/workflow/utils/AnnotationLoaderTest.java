package com.sobekcore.workflow.utils;

import com.sobekcore.workflow.process.step.condition.Condition;
import com.sobekcore.workflow.process.step.condition.ConditionType;
import com.sobekcore.workflow.process.step.condition.metadata.ConditionNone;
import com.sobekcore.workflow.process.step.condition.metadata.Metadata;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith(MockitoExtension.class)
class AnnotationLoaderTest {
    @Test
    void shouldLoadClassWithAnnotation() {
        assertInstanceOf(
            ConditionNone.class,
            AnnotationLoader.load(Condition.class.getPackageName(), Metadata.class, ConditionType.NONE)
        );
    }

    @Test
    void shouldReturnNullWhenExceptionIsThrown() {
        assertNull(
            AnnotationLoader.load(AnnotationLoaderTest.class.getPackageName(), Metadata.class, ConditionType.NONE)
        );
    }
}
