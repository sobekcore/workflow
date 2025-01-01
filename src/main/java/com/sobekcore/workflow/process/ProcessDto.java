package com.sobekcore.workflow.process;

import jakarta.validation.constraints.NotBlank;

public record ProcessDto(
    @NotBlank
    String name
) {
}
