package com.sobekcore.workflow.execution;

import com.sobekcore.workflow.execution.condition.ConditionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExecutionRepository extends JpaRepository<Execution, UUID> {
    List<Execution> findAllByIdAndConditionStatusInAndProcessStepNotNull(UUID id, List<ConditionStatus> conditionStatusList);
}
