package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.auth.AuthRepository;
import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.condition.ConditionStatus;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExecutionRepository extends AuthRepository<Execution, UUID> {
    List<Execution> findAllByUserAndIdAndConditionStatusInAndProcessStepNotNull(
        User user,
        UUID id,
        List<ConditionStatus> conditionStatusList
    );
}
