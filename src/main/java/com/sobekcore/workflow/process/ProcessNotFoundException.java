package com.sobekcore.workflow.process;

public class ProcessNotFoundException extends RuntimeException {
    public ProcessNotFoundException() {
    }

    public ProcessNotFoundException(Exception cause) {
        super(cause);
    }

    public ProcessNotFoundException(String message) {
        super(message);
    }

    public ProcessNotFoundException(String message, Exception cause) {
        super(message, cause);
    }
}
