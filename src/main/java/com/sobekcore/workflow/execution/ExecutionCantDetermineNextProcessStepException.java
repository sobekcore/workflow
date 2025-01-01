package com.sobekcore.workflow.execution;

class ExecutionCantDetermineNextProcessStepException extends RuntimeException {
    public ExecutionCantDetermineNextProcessStepException() {
    }

    public ExecutionCantDetermineNextProcessStepException(Exception cause) {
        super(cause);
    }

    public ExecutionCantDetermineNextProcessStepException(String message) {
        super(message);
    }

    public ExecutionCantDetermineNextProcessStepException(String message, Exception cause) {
        super(message, cause);
    }
}
