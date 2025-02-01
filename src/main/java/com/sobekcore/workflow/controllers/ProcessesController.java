package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.auth.AuthContext;
import com.sobekcore.workflow.execution.ExecutionExistsException;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.*;
import com.sobekcore.workflow.process.step.*;
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
    public List<Process> create(@Valid @RequestBody List<ProcessCreateDto> processCreateDtoList) {
        return processService.create(authContext.getUser(), processCreateDtoList);
    }

    @GetMapping
    public List<Process> read() {
        return processService.read(authContext.getUser());
    }

    @PutMapping
    public List<Process> update(@Valid @RequestBody List<ProcessUpdateDto> processUpdateDtoList) {
        try {
            return processService.update(authContext.getUser(), processUpdateDtoList);
        } catch (ExecutionExistsException exception) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/steps")
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<ProcessStep> createSteps(@Valid @RequestBody List<ProcessStepCreateDto> processStepCreateDtoList) {
        try {
            return processStepService.create(authContext.getUser(), processStepCreateDtoList);
        } catch (ExecutionExistsException exception) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        } catch (ProcessNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/steps")
    public List<ProcessStep> readSteps() {
        return processStepService.read(authContext.getUser());
    }

    @PutMapping("/steps")
    public List<ProcessStep> updateSteps(@Valid @RequestBody List<ProcessStepUpdateDto> processStepUpdateDtoList) {
        try {
            return processStepService.update(authContext.getUser(), processStepUpdateDtoList);
        } catch (ExecutionExistsException exception) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

    @PatchMapping("/steps/assign")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void assignSteps(@Valid @RequestBody List<ProcessStepAssignDto> processStepAssignDtoList) {
        try {
            processStepService.assign(authContext.getUser(), processStepAssignDtoList);
        } catch (ExecutionExistsException exception) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }
}
