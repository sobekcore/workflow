package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.auth.AuthContext;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.*;
import com.sobekcore.workflow.process.step.ProcessStep;
import com.sobekcore.workflow.process.step.ProcessStepAssignDto;
import com.sobekcore.workflow.process.step.ProcessStepDto;
import com.sobekcore.workflow.process.step.ProcessStepService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/processes")
@PreAuthorize("isAuthenticated()")
class ProcessesController {
    private final AuthContext authContext;

    private final ProcessService processService;

    private final ProcessStepService processStepService;

    public ProcessesController(AuthContext authContext, ProcessService processService, ProcessStepService processStepService) {
        this.authContext = authContext;
        this.processService = processService;
        this.processStepService = processStepService;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<Process> create(@Valid @RequestBody List<ProcessDto> processDtoList) {
        return processService.create(authContext.getUser(), processDtoList);
    }

    @GetMapping
    public List<Process> read() {
        return processService.read(authContext.getUser());
    }

    @PostMapping("/steps")
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<ProcessStep> createSteps(@Valid @RequestBody List<ProcessStepDto> processStepDtoList) {
        try {
            return processStepService.create(authContext.getUser(), processStepDtoList);
        } catch (ProcessNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/steps")
    public List<ProcessStep> readSteps() {
        return processStepService.read(authContext.getUser());
    }

    @PatchMapping("/steps/assign")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void assignSteps(@Valid @RequestBody List<ProcessStepAssignDto> processStepAssignDtoList) {
        processStepService.assign(authContext.getUser(), processStepAssignDtoList);
    }
}
