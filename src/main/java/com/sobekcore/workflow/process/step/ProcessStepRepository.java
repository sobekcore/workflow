package com.sobekcore.workflow.process.step;

import com.sobekcore.workflow.auth.AuthRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProcessStepRepository extends AuthRepository<ProcessStep, UUID> {
}
