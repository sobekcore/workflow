package com.sobekcore.workflow.process;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ProcessUpdateDto(
    @NotNull
    UUID id,

    @NotBlank
    String name
) {
}
