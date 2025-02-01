package com.sobekcore.workflow.execution;

public class ExecutionExistsException extends RuntimeException {
    public ExecutionExistsException() {
    }

    public ExecutionExistsException(Exception cause) {
        super(cause);
    }

    public ExecutionExistsException(String message) {
        super(message);
    }

    public ExecutionExistsException(String message, Exception cause) {
        super(message, cause);
    }
}
