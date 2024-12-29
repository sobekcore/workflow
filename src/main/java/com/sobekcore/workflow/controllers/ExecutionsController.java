package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.auth.AuthContext;
import com.sobekcore.workflow.execution.Execution;
import com.sobekcore.workflow.execution.ExecutionDto;
import com.sobekcore.workflow.execution.ExecutionProgressDto;
import com.sobekcore.workflow.execution.ExecutionService;
import com.sobekcore.workflow.process.step.ProcessStepNotPartOfProcessException;
import com.sobekcore.workflow.execution.condition.ConditionCompleteDto;
import com.sobekcore.workflow.execution.condition.ConditionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/executions")
@PreAuthorize("isAuthenticated()")
class ExecutionsController {
    private final AuthContext authContext;

    private final ExecutionService executionService;

    private final ConditionService conditionService;

    public ExecutionsController(AuthContext authContext, ExecutionService executionService, ConditionService conditionService) {
        this.authContext = authContext;
        this.executionService = executionService;
        this.conditionService = conditionService;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<Execution> create(@Valid @RequestBody List<ExecutionDto> executionDtoList) {
        try {
            return executionService.create(authContext.getUser(), executionDtoList);
        } catch (ProcessStepNotPartOfProcessException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public List<Execution> read() {
        return executionService.read(authContext.getUser());
    }

    @PatchMapping("/progress")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void progress(@Valid @RequestBody List<ExecutionProgressDto> executionProgressDtoList) {
        executionService.progress(authContext.getUser(), executionProgressDtoList);
    }

    @PatchMapping("/conditions/complete")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void completeConditions(@Valid @RequestBody List<ConditionCompleteDto> conditionCompleteDtoList) {
        conditionService.complete(authContext.getUser(), conditionCompleteDtoList);
    }
}
