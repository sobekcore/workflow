package com.sobekcore.workflow.process.step;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.ExecutionExistsException;
import com.sobekcore.workflow.execution.ExecutionProcessService;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.ProcessNotFoundException;
import com.sobekcore.workflow.process.ProcessRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcessStepService {
    private static final Logger log = LoggerFactory.getLogger(ProcessStepService.class);

    private final ProcessRepository processRepository;

    private final ProcessStepRepository processStepRepository;

    private final ExecutionProcessService executionProcessService;

    public ProcessStepService(
        ProcessRepository processRepository,
        ProcessStepRepository processStepRepository,
        ExecutionProcessService executionProcessService
    ) {
        this.processRepository = processRepository;
        this.processStepRepository = processStepRepository;
        this.executionProcessService = executionProcessService;
    }

    public List<ProcessStep> create(User user, List<ProcessStepCreateDto> processStepCreateDtoList) {
        log.info("User {} is creating processes steps {}", user.getEmail(), processStepCreateDtoList);

        List<Process> processList = processStepCreateDtoList
            .stream()
            .map(processStepCreateDto -> processRepository.getReferenceById(processStepCreateDto.processId()))
            .toList();

        if (executionProcessService.isExecutionExists(user, processList)) {
            throw new ExecutionExistsException();
        }

        try {
            return processStepRepository.saveAll(
                processStepCreateDtoList
                    .stream()
                    .map(processStepCreateDto -> new ProcessStep(
                        user,
                        processStepCreateDto.name(),
                        processStepCreateDto.description(),
                        processStepCreateDto.condition(),
                        processStepCreateDto.prevProcessStepId() != null
                            ? processStepRepository.findByUserAndId(user, processStepCreateDto.prevProcessStepId()).orElse(null)
                            : null,
                        processStepCreateDto.fromProcessStepsIds() != null
                            ? processStepRepository.findAllByUserAndIdIn(user, processStepCreateDto.fromProcessStepsIds())
                            : null,
                        processRepository.findByUserAndId(user, processStepCreateDto.processId()).orElseThrow()
                    ))
                    .toList()
            );
        } catch (JpaObjectRetrievalFailureException exception) {
            throw new ProcessNotFoundException(exception);
        }
    }

    public List<ProcessStep> read(User user) {
        log.info("User {} is reading processes steps", user.getEmail());

        return processStepRepository.findAllByUser(user);
    }

    public List<ProcessStep> update(User user, List<ProcessStepUpdateDto> processStepUpdateDtoList) {
        log.info("User {} is updating processes steps {}", user.getEmail(), processStepUpdateDtoList);

        List<ProcessStep> processStepList = processStepRepository.findAllByUserAndIdIn(
            user,
            processStepUpdateDtoList.stream().map(ProcessStepUpdateDto::id).toList()
        );

        if (executionProcessService.isExecutionExistsForSteps(user, processStepList)) {
            throw new ExecutionExistsException();
        }

        return processStepRepository.saveAll(
            processStepList
                .stream()
                .map(processStep -> processStepUpdateDtoList
                    .stream()
                    .filter(processStepUpdateDto -> processStepUpdateDto.id().equals(processStep.getId()))
                    .findFirst()
                    .map(processStepUpdateDto -> processStep
                        .setName(processStepUpdateDto.name())
                        .setDescription(processStepUpdateDto.description())
                        .setCondition(processStepUpdateDto.condition())
                    )
                    .orElseThrow()
                )
                .toList()
        );
    }

    public void assign(User user, List<ProcessStepAssignDto> processStepAssignDtoList) {
        log.info("User {} is assigning processes steps {}", user.getEmail(), processStepAssignDtoList);

        List<ProcessStep> processStepList = processStepRepository.findAllByUserAndIdIn(
            user,
            processStepAssignDtoList.stream().map(ProcessStepAssignDto::processStepId).toList()
        );

        if (executionProcessService.isExecutionExistsForSteps(user, processStepList)) {
            throw new ExecutionExistsException();
        }

        processStepAssignDtoList.forEach(processStepAssignDto -> {
            ProcessStep processStep = processStepRepository
                .findByUserAndId(user, processStepAssignDto.processStepId())
                .orElseThrow();

            processStep.getAvailableFrom().add(processStepRepository
                .findByUserAndId(user, processStepAssignDto.assignProcessStepId())
                .orElseThrow()
            );

            processStepRepository.save(processStep);
        });
    }
}
