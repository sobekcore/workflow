package com.sobekcore.workflow.process.step;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.process.ProcessNotFoundException;
import com.sobekcore.workflow.process.ProcessRepository;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcessStepService {
    private final ProcessRepository processRepository;

    private final ProcessStepRepository processStepRepository;

    public ProcessStepService(ProcessRepository processRepository, ProcessStepRepository processStepRepository) {
        this.processRepository = processRepository;
        this.processStepRepository = processStepRepository;
    }

    public List<ProcessStep> create(User user, List<ProcessStepCreateDto> processStepCreateDtoList) {
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
        return processStepRepository.findAllByUser(user);
    }

    public void assign(User user, List<ProcessStepAssignDto> processStepAssignDtoList) {
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

    public List<ProcessStep> update(User user, List<ProcessStepUpdateDto> processStepUpdateDtoList) {
        List<ProcessStep> processStepList = processStepRepository.findAllByUserAndIdIn(
            user,
            processStepUpdateDtoList.stream().map(ProcessStepUpdateDto::id).toList()
        );

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
}
