package com.sobekcore.workflow.process.step;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sobekcore.workflow.process.Process;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

@Entity
@Table
public class ProcessStep {
    @Id
    private UUID id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @JsonIgnore
    @NotNull
    @ManyToOne
    @JoinColumn(nullable = false)
    private Process process;

    @Deprecated
    public ProcessStep() {
    }

    public ProcessStep(String name, Process process) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.process = process;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Process getProcess() {
        return process;
    }
}
