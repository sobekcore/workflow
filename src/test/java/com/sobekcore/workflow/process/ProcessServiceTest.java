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
        ProcessCreateDto processCreateDto = new ProcessCreateDto("Process");

        when(processRepository.saveAll(anyList()))
            .then(returnsFirstArg());

        Process process = processService.create(user, List.of(processCreateDto)).get(0);

        assertEquals(user, process.getUser());
        assertEquals(processCreateDto.name(), process.getName());
    }

    @Test
    void shouldReturnReadProcesses() {
        when(processRepository.findAllByUser(user))
            .thenReturn(List.of(process));

        List<Process> processes = processService.read(user);

        assertEquals(List.of(process), processes);
    }

    @Test
    void shouldReturnUpdatedProcesses() {
        ProcessUpdateDto processUpdateDto = new ProcessUpdateDto(process.getId(), "Process");

        when(processRepository.findAllByUserAndIdIn(user, List.of(process.getId())))
            .thenReturn(List.of(process));
        when(processRepository.saveAll(anyList()))
            .then(returnsFirstArg());

        Process process = processService.update(user, List.of(processUpdateDto)).get(0);

        assertEquals(user, process.getUser());
        assertEquals(processUpdateDto.name(), process.getName());
    }
}
