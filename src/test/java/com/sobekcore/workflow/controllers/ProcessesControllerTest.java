package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.ControllerTest;
import com.sobekcore.workflow.auth.AuthContext;
import com.sobekcore.workflow.auth.user.User;
import com.sobekcore.workflow.execution.ExecutionExistsException;
import com.sobekcore.workflow.process.ProcessService;
import com.sobekcore.workflow.process.step.ProcessStepService;
import com.sobekcore.workflow.process.step.condition.ConditionType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

@WebMvcTest(ProcessesController.class)
class ProcessesControllerTest extends ControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    AuthContext authContext;

    @MockBean
    ProcessService processService;

    @MockBean
    ProcessStepService processStepService;

    RequestBuilder updateProcessesRequest;

    RequestBuilder createStepsRequest;

    RequestBuilder updateStepsRequest;

    RequestBuilder assignStepsRequest;

    @BeforeEach
    void setup() {
        updateProcessesRequest = MockMvcRequestBuilders
            .put("/api/processes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(String.format("""
                    [
                        {
                            "id": "%s",
                            "name": "Process"
                        }
                    ]
                """, UUID.randomUUID()))
            .with(oauth2Login);
        createStepsRequest = MockMvcRequestBuilders
            .post("/api/processes/steps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(String.format("""
                    [
                        {
                            "name": "Process Step",
                            "condition": {
                                "type": "%s"
                            },
                            "processId": "%s"
                        }
                    ]
                """, ConditionType.NONE, UUID.randomUUID()))
            .with(oauth2Login);
        updateStepsRequest = MockMvcRequestBuilders
            .put("/api/processes/steps")
            .contentType(MediaType.APPLICATION_JSON)
            .content(String.format("""
                    [
                        {
                            "id": "%s",
                            "name": "Process Step",
                            "condition": {
                                "type": "%s"
                            }
                        }
                    ]
                """, UUID.randomUUID(), ConditionType.NONE))
            .with(oauth2Login);
        assignStepsRequest = MockMvcRequestBuilders
            .patch("/api/processes/steps/assign")
            .contentType(MediaType.APPLICATION_JSON)
            .content(String.format("""
                    [
                        {
                            "processStepId": "%s",
                            "assignProcessStepId": "%s"
                        }
                    ]
                """, UUID.randomUUID(), UUID.randomUUID()))
            .with(oauth2Login);
    }

    @Test
    void shouldReturnCreatedProcesses() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders
                .post("/api/processes")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    [
                        {
                            "name": "Process"
                        }
                    ]
                """)
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    void shouldReturnReadProcesses() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders
                .get("/api/processes")
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldReturnUpdatedProcesses() throws Exception {
        mockMvc
            .perform(updateProcessesRequest)
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldReturnConflictWhenExecutionExistsForUpdatedProcesses() throws Exception {
        when(authContext.getUser())
            .thenReturn(new User("user@test.com", "User"));
        when(processService.update(any(User.class), anyList()))
            .thenThrow(new ExecutionExistsException());

        mockMvc
            .perform(updateProcessesRequest)
            .andExpect(MockMvcResultMatchers.status().isConflict());
    }

    @Test
    void shouldReturnCreatedSteps() throws Exception {
        mockMvc
            .perform(createStepsRequest)
            .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    void shouldReturnConflictWhenExecutionExistsForCreatedSteps() throws Exception {
        when(authContext.getUser())
            .thenReturn(new User("user@test.com", "User"));
        when(processStepService.create(any(User.class), anyList()))
            .thenThrow(new ExecutionExistsException());

        mockMvc
            .perform(createStepsRequest)
            .andExpect(MockMvcResultMatchers.status().isConflict());
    }

    @Test
    void shouldReturnReadSteps() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders
                .get("/api/processes/steps")
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldReturnUpdatedSteps() throws Exception {
        mockMvc
            .perform(updateStepsRequest)
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldReturnConflictWhenExecutionExistsForUpdatedSteps() throws Exception {
        when(authContext.getUser())
            .thenReturn(new User("user@test.com", "User"));
        when(processStepService.update(any(User.class), anyList()))
            .thenThrow(new ExecutionExistsException());

        mockMvc
            .perform(updateStepsRequest)
            .andExpect(MockMvcResultMatchers.status().isConflict());
    }

    @Test
    void shouldAssignSteps() throws Exception {
        mockMvc
            .perform(assignStepsRequest)
            .andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    @Test
    void shouldReturnConflictWhenExecutionExistsForAssignedSteps() throws Exception {
        when(authContext.getUser())
            .thenReturn(new User("user@test.com", "User"));
        doThrow(new ExecutionExistsException())
            .when(processStepService).assign(any(User.class), anyList());

        mockMvc
            .perform(assignStepsRequest)
            .andExpect(MockMvcResultMatchers.status().isConflict());
    }
}
