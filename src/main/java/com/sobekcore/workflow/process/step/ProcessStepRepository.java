package com.sobekcore.workflow.process.step;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProcessStepRepository extends JpaRepository<ProcessStep, UUID> {
}
