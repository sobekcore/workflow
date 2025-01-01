package com.sobekcore.workflow.process;

import com.sobekcore.workflow.auth.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProcessServiceTest {
    @Mock
    ProcessRepository processRepository;

    ProcessService processService;

    User user;

    Process process;

    @BeforeEach
    void setup() {
        processService = new ProcessService(processRepository);
        user = new User("user@test.com", "User");
        process = new Process(user, "Process");
    }

    @Test
    void shouldReturnCreatedProcesses() {
        ProcessDto processDto = new ProcessDto("Process");

        when(processRepository.saveAll(anyList()))
            .then(returnsFirstArg());

        Process process = processService.create(user, List.of(processDto)).get(0);

        assertEquals(user, process.getUser());
        assertEquals(processDto.getName(), process.getName());
    }

    @Test
    void shouldReturnReadProcesses() {
        when(processRepository.findAllByUser(user))
            .thenReturn(List.of(process));

        List<Process> processes = processService.read(user);

        assertEquals(List.of(process), processes);
    }
}
