package com.sobekcore.workflow.process.step;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sobekcore.workflow.process.Process;
import com.sobekcore.workflow.process.step.condition.*;
import com.sobekcore.workflow.process.step.condition.radio.ConditionDataRadio;
import com.sobekcore.workflow.process.step.condition.radio.ConditionDataRadioConverter;
import com.sobekcore.workflow.process.step.condition.visit.ConditionDataVisit;
import com.sobekcore.workflow.process.step.condition.visit.ConditionDataVisitConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Internal;

import java.util.Date;
import java.util.UUID;

@Entity
@Table
public class ProcessStep {
    @Id
    private UUID id;

    @NotNull
    @Column(nullable = false)
    private Date createdAt;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConditionType conditionType;

    @Convert(converter = ConditionDataVisitConverter.class)
    private ConditionDataVisit conditionDataVisit;

    @Convert(converter = ConditionDataRadioConverter.class)
    private ConditionDataRadio conditionDataRadio;

    @JsonIgnore
    @NotNull
    @ManyToOne
    @JoinColumn(nullable = false)
    private Process process;

    public ProcessStep(
        String name,
        String description,
        ConditionType conditionType,
        ConditionDataVisit conditionDataVisit,
        ConditionDataRadio conditionDataRadio,
        Process process
    ) {
        id = UUID.randomUUID();
        createdAt = new Date();
        this.name = name;
        this.description = description;
        this.conditionType = conditionType;
        if (conditionType == ConditionType.VISIT) {
            this.conditionDataVisit = conditionDataVisit;
        } else if (conditionType == ConditionType.RADIO) {
            this.conditionDataRadio = conditionDataRadio;
        }
        this.process = process;
    }

    @Internal
    protected ProcessStep() {
    }

    public UUID getId() {
        return id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public ConditionType getConditionType() {
        return conditionType;
    }

    public ConditionDataVisit getConditionDataVisit() {
        return conditionDataVisit;
    }

    public ConditionDataRadio getConditionDataRadio() {
        return conditionDataRadio;
    }

    public Process getProcess() {
        return process;
    }
}
