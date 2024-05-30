package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.ProcessDto;
import com.sobekcore.workflow.process.ProcessNotFoundException;
import com.sobekcore.workflow.process.ProcessService;
import com.sobekcore.workflow.process.step.ProcessStep;
import com.sobekcore.workflow.process.step.ProcessStepDto;
import com.sobekcore.workflow.process.step.ProcessStepService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/processes")
class ProcessesController {
    private final ProcessService processService;

    private final ProcessStepService processStepService;

    public ProcessesController(ProcessService processService, ProcessStepService processStepService) {
        this.processService = processService;
        this.processStepService = processStepService;
    }

    @PostMapping
    public List<Process> create(@Valid @RequestBody List<ProcessDto> processDtoList) {
        return processService.create(processDtoList);
    }

    @GetMapping
    public List<Process> get() {
        return processService.read();
    }

    @PostMapping("/steps")
    public List<ProcessStep> createSteps(@Valid @RequestBody List<ProcessStepDto> processStepDtoList) {
        try {
            return processStepService.create(processStepDtoList);
        } catch (ProcessNotFoundException exception) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(400));
        }
    }

    @GetMapping("/steps")
    public List<ProcessStep> getSteps() {
        return processStepService.read();
    }
}
