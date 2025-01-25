package com.sobekcore.workflow.auth.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    UserRepository userRepository;

    UserService userService;

    User user;

    @BeforeEach
    void setup() {
        userService = new UserService(userRepository);
        user = new User("user@test.com", "User");
    }

    @Test
    void shouldReturnUpdatedUser() {
        UserDto userDto = new UserDto(user.getEmail(), user.getName());

        when(userRepository.findByEmail(user.getEmail()))
            .thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class)))
            .then(returnsFirstArg());

        user = userService.update(userDto);

        assertEquals(userDto.email(), user.getEmail());
        assertEquals(userDto.name(), user.getName());
    }
}
