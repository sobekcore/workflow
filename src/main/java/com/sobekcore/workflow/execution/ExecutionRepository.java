package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.auth.AuthRepository;
import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.condition.ConditionStatus;
import com.sobekcore.workflow.process.Process;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExecutionRepository extends AuthRepository<Execution, UUID> {
    Optional<Execution> findByUserAndProcessInAndProcessStepNotNull(
        User user,
        List<Process> process
    );

    List<Execution> findAllByUserAndIdAndConditionStatusInAndProcessStepNotNull(
        User user,
        UUID id,
        List<ConditionStatus> conditionStatusList
    );
}
