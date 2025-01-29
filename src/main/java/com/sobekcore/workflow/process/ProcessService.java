package com.sobekcore.workflow.process;

import com.sobekcore.workflow.auth.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcessService {
    private final ProcessRepository processRepository;

    public ProcessService(ProcessRepository processRepository) {
        this.processRepository = processRepository;
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
