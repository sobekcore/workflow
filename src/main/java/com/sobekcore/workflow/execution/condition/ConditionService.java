package com.sobekcore.workflow.execution.condition;

import com.sobekcore.workflow.execution.ExecutionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConditionService {
    private final ExecutionRepository executionRepository;

    public ConditionService(ExecutionRepository executionRepository) {
        this.executionRepository = executionRepository;
    }

    public void complete(List<ConditionCompleteDto> conditionCompleteDtoList) {
        executionRepository.saveAll(
            conditionCompleteDtoList
                .stream()
                .map(conditionCompleteDto -> executionRepository.getReferenceById(conditionCompleteDto.getExecutionId()))
                .map(execution -> execution.setConditionCompleted(true))
                .toList()
        );
    }
}
