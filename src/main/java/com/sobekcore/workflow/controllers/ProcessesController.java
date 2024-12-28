package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.process.*;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.step.ProcessStep;
import com.sobekcore.workflow.process.step.ProcessStepDto;
import com.sobekcore.workflow.process.step.ProcessStepService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/processes")
@PreAuthorize("isAuthenticated()")
class ProcessesController {
    private final ProcessService processService;

    private final ProcessStepService processStepService;

    public ProcessesController(ProcessService processService, ProcessStepService processStepService) {
        this.processService = processService;
        this.processStepService = processStepService;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<Process> create(@Valid @RequestBody List<ProcessDto> processDtoList) {
        return processService.create(processDtoList);
    }

    @GetMapping
    public List<Process> read() {
        return processService.read();
    }

    @PostMapping("/steps")
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<ProcessStep> createSteps(@Valid @RequestBody List<ProcessStepDto> processStepDtoList) {
        try {
            return processStepService.create(processStepDtoList);
        } catch (ProcessNotFoundException exception) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(400));
        }
    }

    @GetMapping("/steps")
    public List<ProcessStep> readSteps() {
        return processStepService.read();
    }

    @PatchMapping("/steps/assign")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void assignSteps(@Valid @RequestBody List<ProcessAssignDto> processAssignDtoList) {
        processStepService.assign(processAssignDtoList);
    }
}
