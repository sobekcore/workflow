package com.sobekcore.workflow.process.step;

import com.sobekcore.workflow.process.step.condition.Condition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public class ProcessStepDto {
    @NotBlank
    private String name;

    private String description;

    @NotNull
    private Condition condition;

    private UUID prevProcessStepId;

    private List<UUID> fromProcessStepsIds;

    @NotNull
    private UUID processId;

    public ProcessStepDto(
        String name,
        String description,
        Condition condition,
        UUID prevProcessStepId,
        List<UUID> fromProcessStepsIds,
        UUID processId
    ) {
        this.name = name;
        this.description = description;
        this.condition = condition;
        this.prevProcessStepId = prevProcessStepId;
        this.fromProcessStepsIds = fromProcessStepsIds;
        this.processId = processId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Condition getCondition() {
        return condition;
    }

    public UUID getPrevProcessStepId() {
        return prevProcessStepId;
    }

    public List<UUID> getFromProcessStepsIds() {
        return fromProcessStepsIds;
    }

    public UUID getProcessId() {
        return processId;
    }
}
