package com.sobekcore.workflow.process;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcessService {
    private final ProcessRepository processRepository;

    public ProcessService(ProcessRepository processRepository) {
        this.processRepository = processRepository;
    }

    public List<Process> create(List<ProcessDto> processDtoList) {
        return processRepository.saveAll(
            processDtoList
                .stream()
                .map(processDto -> new Process(processDto.getName()))
                .toList()
        );
    }

    public List<Process> read() {
        return processRepository.findAll();
    }
}
