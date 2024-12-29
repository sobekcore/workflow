package com.sobekcore.workflow.process;

import com.sobekcore.workflow.auth.AuthRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProcessRepository extends AuthRepository<Process, UUID> {
}
