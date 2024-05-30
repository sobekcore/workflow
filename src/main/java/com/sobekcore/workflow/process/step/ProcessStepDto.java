package com.sobekcore.workflow.process.step;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class ProcessStepDto {
    @NotBlank
    private String name;

    @NotNull
    private UUID processId;

    public String getName() {
        return name;
    }

    public UUID getProcessId() {
        return processId;
    }
}
