package com.sobekcore.workflow.process.step;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.step.condition.Condition;
import com.sobekcore.workflow.process.step.condition.ConditionConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Internal;
import org.hibernate.annotations.ColumnTransformer;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table
public class ProcessStep {
    @Id
    private UUID id;

    @NotNull
    @Column(nullable = false)
    private Instant createdAt;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @Convert(converter = ConditionConverter.class)
    @ColumnTransformer(write = "?::jsonb")
    @Column(columnDefinition = "jsonb")
    private Condition condition;

    @ManyToOne
    @JoinColumn
    private ProcessStep prevProcessStep;

    @OneToMany
    @JoinColumn
    private List<ProcessStep> stepAvailableFrom;

    @JsonIgnore
    @NotNull
    @ManyToOne
    @JoinColumn(nullable = false)
    private Process process;

    public ProcessStep(
        String name,
        String description,
        Condition condition,
        ProcessStep prevProcessStep,
        List<ProcessStep> stepAvailableFrom,
        Process process
    ) {
        id = UUID.randomUUID();
        createdAt = Instant.now();
        this.name = name;
        this.description = description;
        this.condition = condition;
        this.prevProcessStep = prevProcessStep;
        this.stepAvailableFrom = stepAvailableFrom;
        this.process = process;
    }

    @Internal
    protected ProcessStep() {
    }

    public UUID getId() {
        return id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Condition getCondition() {
        return condition;
    }

    public ProcessStep getPrevProcessStep() {
        return prevProcessStep;
    }

    public List<ProcessStep> getStepAvailableFrom() {
        return stepAvailableFrom;
    }

    public Process getProcess() {
        return process;
    }
}
