package com.sobekcore.workflow.execution.condition;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.ExecutionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConditionService {
    private final ExecutionRepository executionRepository;

    public ConditionService(ExecutionRepository executionRepository) {
        this.executionRepository = executionRepository;
    }

    public void complete(User user, List<ConditionCompleteDto> conditionCompleteDtoList) {
        executionRepository.saveAll(
            conditionCompleteDtoList
                .stream()
                .map(conditionCompleteDto -> executionRepository
                    .findByUserAndId(user, conditionCompleteDto.executionId())
                    .orElseThrow()
                    .setConditionState(conditionCompleteDto.state())
                )
                .toList()
        );
    }
}
