package com.sobekcore.workflow.auth.user;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User update(UserDto userDto) {
        return userRepository
            .findByEmail(userDto.email())
            .map(user -> user
                .setName(userDto.name())
            )
            .map(userRepository::save)
            .orElse(null);
    }
}
