package com.sobekcore.workflow.process;

import com.sobekcore.workflow.process.step.ProcessStep;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table
public class Process {
    @Id
    private UUID id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @OneToMany
    @JoinColumn(name = "process_id")
    private List<ProcessStep> steps;

    @Deprecated
    public Process() {
    }

    public Process(String name) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.steps = new ArrayList<>();
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<ProcessStep> getSteps() {
        return steps;
    }
}
