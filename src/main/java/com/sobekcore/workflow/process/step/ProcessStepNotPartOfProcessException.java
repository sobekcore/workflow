package com.sobekcore.workflow.process.step;

public class ProcessStepNotPartOfProcessException extends RuntimeException {
    public ProcessStepNotPartOfProcessException() {
    }

    public ProcessStepNotPartOfProcessException(Exception cause) {
        super(cause);
    }

    public ProcessStepNotPartOfProcessException(String message) {
        super(message);
    }

    public ProcessStepNotPartOfProcessException(String message, Exception cause) {
        super(message, cause);
    }
}
