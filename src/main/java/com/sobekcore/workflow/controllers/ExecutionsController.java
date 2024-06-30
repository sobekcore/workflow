package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.execution.Execution;
import com.sobekcore.workflow.execution.ExecutionDto;
import com.sobekcore.workflow.execution.ExecutionProgressDto;
import com.sobekcore.workflow.execution.ExecutionService;
import com.sobekcore.workflow.process.step.ProcessStepNotPartOfProcessException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/executions")
class ExecutionsController {
    private final ExecutionService executionService;

    public ExecutionsController(ExecutionService executionService) {
        this.executionService = executionService;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<Execution> create(@Valid @RequestBody List<ExecutionDto> executionDtoList) {
        try {
            return executionService.create(executionDtoList);
        } catch (ProcessStepNotPartOfProcessException exception) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(400));
        }
    }

    @GetMapping
    public List<Execution> read() {
        return executionService.read();
    }

    @PatchMapping("/progress")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void progress(@Valid @RequestBody List<ExecutionProgressDto> executionProgressDtoList) {
        executionService.progress(executionProgressDtoList);
    }
}
