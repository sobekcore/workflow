import { z } from 'zod';
import { HttpMethod } from '@/enums/http.ts';
import { ProcessStep, ProcessStepToUpdate } from '@/interfaces/process-step/process-step.ts';
import { processStepSchema } from '@/schemas/process-step/process-step.ts';
import { httpClient } from '@/utils/http-client.ts';

export function updateProcessesSteps(processesSteps: ProcessStepToUpdate[]): Promise<ProcessStep[]> {
  return httpClient(HttpMethod.PUT, '/processes/steps', {
    schema: z.array(processStepSchema),
    body: processesSteps,
  });
}
