package com.sobekcore.workflow.auth.user;

import jakarta.validation.constraints.NotBlank;

public record UserDto(
    @NotBlank
    String email,

    @NotBlank
    String name
) {
}
