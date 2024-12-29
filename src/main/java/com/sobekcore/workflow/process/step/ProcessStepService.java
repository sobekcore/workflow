package com.sobekcore.workflow.process.step;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.process.ProcessAssignDto;
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
                        processStepDto.getName(),
                        processStepDto.getDescription(),
                        processStepDto.getCondition(),
                        processStepDto.getPrevProcessStepId() != null
                            ? processStepRepository.findByUserAndId(user, processStepDto.getPrevProcessStepId()).orElse(null)
                            : null,
                        processStepDto.getFromProcessStepsIds() != null
                            ? processStepRepository.findAllByUserAndIdIn(user, processStepDto.getFromProcessStepsIds())
                            : null,
                        processRepository.findByUserAndId(user, processStepDto.getProcessId()).orElseThrow()
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

    public void assign(User user, List<ProcessAssignDto> processAssignDtoList) {
        processAssignDtoList.forEach(processAssignDto -> {
            ProcessStep processStep = processStepRepository
                .findByUserAndId(user, processAssignDto.getProcessStepId())
                .orElseThrow();

            processStep.getAvailableFrom().add(processStepRepository
                .findByUserAndId(user, processAssignDto.getAssignProcessStepId())
                .orElseThrow()
            );

            processStepRepository.save(processStep);
        });
    }
}
