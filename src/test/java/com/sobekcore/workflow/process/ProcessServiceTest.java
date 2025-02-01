package com.sobekcore.workflow.process;

import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.ExecutionExistsException;
import com.sobekcore.workflow.execution.ExecutionProcessService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProcessServiceTest {
    @Mock
    ProcessRepository processRepository;

    @Mock
    ExecutionProcessService executionProcessService;

    ProcessService processService;

    User user;

    Process process;

    ProcessUpdateDto processUpdateDto;

    @BeforeEach
    void setup() {
        processService = new ProcessService(processRepository, executionProcessService);
        user = new User("user@test.com", "User");
        process = new Process(user, "Process");
        processUpdateDto = new ProcessUpdateDto(process.getId(), "Process");
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
        when(processRepository.findAllByUserAndIdIn(user, List.of(process.getId())))
            .thenReturn(List.of(process));
        when(processRepository.saveAll(anyList()))
            .then(returnsFirstArg());

        Process process = processService.update(user, List.of(processUpdateDto)).get(0);

        assertEquals(user, process.getUser());
        assertEquals(processUpdateDto.name(), process.getName());
    }

    @Test
    void shouldThrowExceptionWhenExecutionExistsForUpdatedProcesses() {
        when(processRepository.findAllByUserAndIdIn(user, List.of(process.getId())))
            .thenReturn(List.of(process));
        when(executionProcessService.isExecutionExists(user, List.of(process)))
            .thenReturn(true);

        assertThrows(
            ExecutionExistsException.class,
            () -> processService.update(user, List.of(processUpdateDto))
        );
    }
}
