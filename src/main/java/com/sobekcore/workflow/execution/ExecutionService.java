package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.condition.ConditionStatus;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.ProcessRepository;
import com.sobekcore.workflow.process.step.ProcessStepRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExecutionService {
    private static final Logger log = LoggerFactory.getLogger(ExecutionService.class);

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

    public List<Execution> create(User user, List<ExecutionDto> executionDtoList) {
        log.info("User {} is creating executions {}", user.getEmail(), executionDtoList);

        List<Process> processList = processRepository.findAllByUserAndIdIn(
            user,
            executionDtoList.stream().map(ExecutionDto::processId).toList()
        );

        return executionRepository.saveAll(
            executionDtoList
                .stream()
                .map(executionDto -> new Execution(
                    user,
                    processList
                        .stream()
                        .filter(process -> process.getId().equals(executionDto.processId()))
                        .findFirst()
                        .orElseThrow(),
                    processStepRepository
                        .findByUserAndId(user, executionDto.processStepId())
                        .orElseThrow()
                ))
                .toList()
        );
    }

    public List<Execution> read(User user) {
        log.info("User {} is reading executions", user.getEmail());

        return executionRepository.findAllByUser(user);
    }

    public void progress(User user, List<ExecutionProgressDto> executionProgressDtoList) {
        log.info("User {} is progressing executions {}", user.getEmail(), executionProgressDtoList);

        executionProgressDtoList.forEach(executionProgressDto ->
            executionRepository.saveAll(
                findExecutionsToProgress(user, executionProgressDto)
                    .stream()
                    .map(execution -> {
                        try {
                            return execution.setProcessStep(execution.findNextProcessStep(
                                executionProgressDto.chooseProcessStepId() != null
                                    ? processStepRepository.getReferenceById(executionProgressDto.chooseProcessStepId())
                                    : null
                            ));
                        } catch (ExecutionCantDetermineNextProcessStepException exception) {
                            return execution.setConditionStatus(ConditionStatus.CHOOSE);
                        }
                    })
                    .toList()
            ));
    }

    private List<Execution> findExecutionsToProgress(User user, ExecutionProgressDto executionProgressDto) {
        return executionRepository.findAllByUserAndIdAndConditionStatusInAndProcessStepNotNull(
            user,
            executionProgressDto.executionId(),
            List.of(ConditionStatus.COMPLETED, ConditionStatus.CHOOSE)
        );
    }
}
