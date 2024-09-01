package com.sobekcore.workflow.process.step;

import com.sobekcore.workflow.process.step.condition.Condition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class ProcessStepDto {
    @NotBlank
    private String name;

    private String description;

    @NotNull
    private Condition condition;

    @NotNull
    private UUID processId;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Condition getCondition() {
        return condition;
    }

    public UUID getProcessId() {
        return processId;
    }
}
