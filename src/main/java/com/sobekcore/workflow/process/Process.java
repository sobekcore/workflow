package com.sobekcore.workflow.process;

import java.util.UUID;

public class Process {
    private final UUID id;
    private final String name;

    public Process(String name) {
        this.id = UUID.randomUUID();
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
