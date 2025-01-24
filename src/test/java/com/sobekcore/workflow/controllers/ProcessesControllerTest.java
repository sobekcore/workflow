package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.ControllerTest;
import com.sobekcore.workflow.auth.AuthContext;
import com.sobekcore.workflow.process.ProcessService;
import com.sobekcore.workflow.process.step.ProcessStepService;
import com.sobekcore.workflow.process.step.condition.ConditionType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.UUID;

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
    void shouldReturnCreatedSteps() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders
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
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isCreated());
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
    void shouldAssignSteps() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders
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
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isNoContent());
    }
}
