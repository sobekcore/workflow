package com.sobekcore.workflow.process;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.process.step.ProcessStep;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Internal;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table
public class Process {
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

    @OneToMany
    @JoinColumn(name = "process_id")
    private List<ProcessStep> steps;

    public Process(User user, String name) {
        id = UUID.randomUUID();
        createdAt = Instant.now();
        this.user = user;
        this.name = name;
        steps = new ArrayList<>();
    }

    @Internal
    protected Process() {
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

    public List<ProcessStep> getSteps() {
        return steps;
    }

    public Process setName(String name) {
        this.name = name;

        return this;
    }
}
