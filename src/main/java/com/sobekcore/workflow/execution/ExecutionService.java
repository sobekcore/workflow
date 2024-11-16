package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.execution.condition.ConditionStatus;
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
        executionProgressDtoList.forEach(executionProgressDto ->
            executionRepository.saveAll(
                findExecutionsToProgress(executionProgressDto)
                    .stream()
                    .map(execution -> {
                        try {
                            return execution.setProcessStep(execution.findNextProcessStep(
                                executionProgressDto.getChooseProcessStepId() != null
                                    ? processStepRepository.getReferenceById(executionProgressDto.getChooseProcessStepId())
                                    : null
                            ));
                        } catch (ExecutionCantDetermineNextProcessStepException exception) {
                            return execution.setConditionStatus(ConditionStatus.CHOOSE);
                        }
                    })
                    .toList()
            ));
    }

    private List<Execution> findExecutionsToProgress(ExecutionProgressDto executionProgressDto) {
        return executionRepository.findAllByIdAndProcessAndProcessStepAndConditionStatusInAndProcessStepNotNull(
            executionProgressDto.getExecutionId(),
            processRepository.getReferenceById(executionProgressDto.getProcessId()),
            processStepRepository.getReferenceById(executionProgressDto.getProcessStepId()),
            List.of(ConditionStatus.COMPLETED, ConditionStatus.CHOOSE)
        );
    }
}
