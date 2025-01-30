package com.sobekcore.workflow.process.step;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.step.condition.Condition;
import com.sobekcore.workflow.process.step.condition.ConditionConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Internal;
import org.hibernate.annotations.ColumnTransformer;

import java.time.Instant;
import java.util.ArrayList;
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

    @JsonIgnore
    @NotNull
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @Convert(converter = ConditionConverter.class)
    @ColumnTransformer(write = "?::jsonb")
    @Column(columnDefinition = "jsonb")
    private Condition condition;

    @NestedProcessStep
    @ManyToOne
    @JoinColumn
    private ProcessStep prevProcessStep;

    @NestedProcessStep
    @ManyToMany
    private List<ProcessStep> availableFrom;

    @JsonIgnore
    @ManyToMany(mappedBy = "availableFrom")
    private List<ProcessStep> availableTo;

    @JsonIgnore
    @NotNull
    @ManyToOne
    @JoinColumn(nullable = false)
    private Process process;

    public ProcessStep(
        User user,
        String name,
        String description,
        Condition condition,
        ProcessStep prevProcessStep,
        List<ProcessStep> availableFrom,
        Process process
    ) {
        id = UUID.randomUUID();
        createdAt = Instant.now();
        this.user = user;
        this.name = name;
        this.description = description;
        this.condition = condition;
        this.prevProcessStep = prevProcessStep;
        this.availableFrom = availableFrom;
        this.availableTo = new ArrayList<>();
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

    public User getUser() {
        return user;
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

    public List<ProcessStep> getAvailableFrom() {
        return availableFrom;
    }

    public List<ProcessStep> getAvailableTo() {
        return availableTo;
    }

    public Process getProcess() {
        return process;
    }

    public ProcessStep setName(String name) {
        this.name = name;

        return this;
    }

    public ProcessStep setDescription(String description) {
        this.description = description;

        return this;
    }

    public ProcessStep setCondition(Condition condition) {
        this.condition = condition;

        return this;
    }
}
