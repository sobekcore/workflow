package com.sobekcore.workflow.auth.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Internal;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table
public class User {
    @Id
    private UUID id;

    @NotNull
    @Column(nullable = false)
    private Instant createdAt;

    @NotBlank
    @Column(nullable = false)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String name;

    public User(String email, String name) {
        this.id = UUID.randomUUID();
        this.createdAt = Instant.now();
        this.email = email;
        this.name = name;
    }

    @Internal
    protected User() {
    }

    public UUID getId() {
        return id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public User setName(String name) {
        this.name = name;

        return this;
    }
}
