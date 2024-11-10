package com.sobekcore.workflow.process.step;

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

    public List<ProcessStep> create(List<ProcessStepDto> processStepDtoList) {
        try {
            return processStepRepository.saveAll(
                processStepDtoList
                    .stream()
                    .map(processStepDto -> new ProcessStep(
                        processStepDto.getName(),
                        processStepDto.getDescription(),
                        processStepDto.getCondition(),
                        processStepDto.getPrevProcessStepId() != null
                            ? processStepRepository.findById(processStepDto.getPrevProcessStepId()).orElse(null)
                            : null,
                        processStepDto.getFromProcessStepsIds() != null
                            ? processStepRepository.findAllById(processStepDto.getFromProcessStepsIds())
                            : null,
                        processRepository.getReferenceById(processStepDto.getProcessId())
                    ))
                    .toList()
            );
        } catch (JpaObjectRetrievalFailureException exception) {
            throw new ProcessNotFoundException(exception);
        }
    }

    public List<ProcessStep> read() {
        return processStepRepository.findAll();
    }
}
