package com.sobekcore.workflow.controllers;

import com.sobekcore.workflow.ControllerTest;
import com.sobekcore.workflow.auth.AuthContext;
import com.sobekcore.workflow.execution.ExecutionService;
import com.sobekcore.workflow.execution.condition.ConditionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.UUID;

@WebMvcTest(ExecutionsController.class)
class ExecutionsControllerTest extends ControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    AuthContext authContext;

    @MockBean
    ExecutionService executionService;

    @MockBean
    ConditionService conditionService;

    @Test
    void shouldReturnCreatedExecutions() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders
                .post("/executions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(String.format("""
                    [
                        {
                            "processId": "%s",
                            "processStepId": "%s"
                        }
                    ]
                """, UUID.randomUUID(), UUID.randomUUID()))
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    void shouldReturnReadExecutions() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders
                .get("/executions")
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldProgressExecutions() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders
                .patch("/executions/progress")
                .contentType(MediaType.APPLICATION_JSON)
                .content(String.format("""
                    [
                        {
                            "executionId": "%s"
                        }
                    ]
                """, UUID.randomUUID()))
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    @Test
    void shouldCompleteConditions() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders
                .patch("/executions/conditions/complete")
                .contentType(MediaType.APPLICATION_JSON)
                .content(String.format("""
                    [
                        {
                            "executionId": "%s"
                        }
                    ]
                """, UUID.randomUUID()))
                .with(oauth2Login)
            )
            .andExpect(MockMvcResultMatchers.status().isNoContent());
    }
}
