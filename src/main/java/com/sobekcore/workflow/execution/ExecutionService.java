package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.ProcessRepository;
import com.sobekcore.workflow.process.step.ProcessStepRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExecutionService {
    private final ExecutionRepository executionRepository;

    private final ProcessRepository processRepository;

    private final ProcessStepRepository processStepRepository;

    public ExecutionService(
        ExecutionRepository executionRepository,
        ProcessRepository processRepository,
        ProcessStepRepository processStepRepository
    ) {
        this.executionRepository = executionRepository;
        this.processRepository = processRepository;
        this.processStepRepository = processStepRepository;
    }

    public List<Execution> create(List<ExecutionDto> executionDtoList) {
        List<Process> processList = processRepository.findAllById(
            executionDtoList.stream().map(ExecutionDto::getProcessId).toList()
        );

        return executionRepository.saveAll(
            executionDtoList
                .stream()
                .map(executionDto -> new Execution(
                    processList.stream().filter(process -> process.getId().equals(executionDto.getProcessId())).findFirst().orElseThrow(),
                    processStepRepository.findById(executionDto.getProcessStepId()).orElseThrow()
                ))
                .toList()
        );
    }

    public List<Execution> read() {
        return executionRepository.findAll();
    }

    public void progress(List<ExecutionProgressDto> executionProgressDtoList) {
        List<String> executionIdList = executionProgressDtoList.stream().map(executionProgressDto -> executionProgressDto.getExecutionId().toString()).toList();
        List<String> processIdList = executionProgressDtoList.stream().map(executionProgressDto -> executionProgressDto.getProcessId().toString()).toList();
        List<String> processStepIdList = executionProgressDtoList.stream().map(executionProgressDto -> executionProgressDto.getProcessStepId().toString()).toList();

        executionRepository.saveAll(
            executionRepository
                .findAll()
                .stream()
                .filter(execution -> executionIdList.isEmpty() || executionIdList.contains(execution.getId().toString()))
                .filter(execution -> processIdList.isEmpty() || processIdList.contains(execution.getProcess().getId().toString()))
                .filter(execution -> processStepIdList.isEmpty() || processStepIdList.contains(execution.getProcessStep().getId().toString()))
                .filter(Execution::isConditionCompleted)
                .filter(execution -> execution.getProcessStep() != null)
                .map(execution -> execution.setProcessStep(execution.getNextProcessStep()))
                .toList()
        );
    }
}
