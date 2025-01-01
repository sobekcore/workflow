package com.sobekcore.workflow.process;

import jakarta.validation.constraints.NotBlank;

public class ProcessDto {
    @NotBlank
    private String name;

    public ProcessDto(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
