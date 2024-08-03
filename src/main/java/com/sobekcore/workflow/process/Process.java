package com.sobekcore.workflow.process;

import com.sobekcore.workflow.process.step.ProcessStep;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Internal;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table
public class Process {
    @Id
    private UUID id;

    @NotNull
    @Column(nullable = false)
    private Date createdAt;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @OneToMany
    @JoinColumn(name = "process_id")
    private List<ProcessStep> steps;

    public Process(String name) {
        id = UUID.randomUUID();
        createdAt = new Date();
        this.name = name;
        steps = new ArrayList<>();
    }

    @Internal
    protected Process() {
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

    public List<ProcessStep> getSteps() {
        return steps;
    }
}
