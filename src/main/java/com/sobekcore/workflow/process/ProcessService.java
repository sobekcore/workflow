package com.sobekcore.workflow.process;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.ExecutionExistsException;
import com.sobekcore.workflow.execution.ExecutionProcessService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcessService {
    private final ProcessRepository processRepository;

    private final ExecutionProcessService executionProcessService;

    public ProcessService(ProcessRepository processRepository, ExecutionProcessService executionProcessService) {
        this.processRepository = processRepository;
        this.executionProcessService = executionProcessService;
    }

    public List<Process> create(User user, List<ProcessCreateDto> processCreateDtoList) {
        return processRepository.saveAll(
            processCreateDtoList
                .stream()
                .map(processCreateDto -> new Process(user, processCreateDto.name()))
                .toList()
        );
    }

    public List<Process> read(User user) {
        return processRepository.findAllByUser(user);
    }

    public List<Process> update(User user, List<ProcessUpdateDto> processUpdateDtoList) {
        List<Process> processList = processRepository.findAllByUserAndIdIn(
            user,
            processUpdateDtoList.stream().map(ProcessUpdateDto::id).toList()
        );

        if (executionProcessService.isExecutionExists(user, processList)) {
            throw new ExecutionExistsException();
        }

        return processRepository.saveAll(
            processList
                .stream()
                .map(process -> processUpdateDtoList
                    .stream()
                    .filter(processUpdateDto -> processUpdateDto.id().equals(process.getId()))
                    .findFirst()
                    .map(processUpdateDto -> process
                        .setName(processUpdateDto.name())
                    )
                    .orElseThrow()
                )
                .toList()
        );
    }
}
