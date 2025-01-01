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

    public List<ProcessStep> create(User user, List<ProcessStepDto> processStepDtoList) {
        try {
            return processStepRepository.saveAll(
                processStepDtoList
                    .stream()
                    .map(processStepDto -> new ProcessStep(
                        user,
                        processStepDto.name(),
                        processStepDto.description(),
                        processStepDto.condition(),
                        processStepDto.prevProcessStepId() != null
                            ? processStepRepository.findByUserAndId(user, processStepDto.prevProcessStepId()).orElse(null)
                            : null,
                        processStepDto.fromProcessStepsIds() != null
                            ? processStepRepository.findAllByUserAndIdIn(user, processStepDto.fromProcessStepsIds())
                            : null,
                        processRepository.findByUserAndId(user, processStepDto.processId()).orElseThrow()
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
}
