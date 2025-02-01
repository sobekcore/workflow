package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.step.ProcessStep;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExecutionProcessService {
    private final ExecutionRepository executionRepository;

    public ExecutionProcessService(ExecutionRepository executionRepository) {
        this.executionRepository = executionRepository;
    }

    public boolean isExecutionExists(User user, List<Process> processList) {
        return executionRepository
            .findByUserAndProcessInAndProcessStepNotNull(user, processList)
            .isPresent();
    }

    public boolean isExecutionExistsForSteps(User user, List<ProcessStep> processStepList) {
        return isExecutionExists(
            user,
            processStepList.stream().map(ProcessStep::getProcess).toList()
        );
    }
}
