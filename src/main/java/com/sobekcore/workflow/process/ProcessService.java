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

    public List<Process> create(User user, List<ProcessDto> processDtoList) {
        return processRepository.saveAll(
            processDtoList
                .stream()
                .map(processDto -> new Process(user, processDto.name()))
                .toList()
        );
    }

    public List<Process> read(User user) {
        return processRepository.findAllByUser(user);
    }
}
