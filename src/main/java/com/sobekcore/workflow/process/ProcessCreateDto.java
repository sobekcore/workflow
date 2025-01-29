package com.sobekcore.workflow.process;

import jakarta.validation.constraints.NotBlank;

public record ProcessCreateDto(
    @NotBlank
    String name
) {
}
