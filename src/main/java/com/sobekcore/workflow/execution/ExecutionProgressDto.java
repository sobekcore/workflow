package com.sobekcore.workflow.execution;

import java.util.UUID;

public class ExecutionProgressDto {
    private UUID executionId;

    private UUID processId;

    private UUID processStepId;

    public UUID getExecutionId() {
        return executionId;
    }

    public UUID getProcessId() {
        return processId;
    }

    public UUID getProcessStepId() {
        return processStepId;
    }
}
