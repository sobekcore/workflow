import { z } from 'zod';
import { HttpMethod } from '@/enums/http.ts';
import { ProcessStep, ProcessStepToAdd } from '@/interfaces/process-step/process-step.ts';
import { processStepSchema } from '@/schemas/process-step/process-step.ts';
import { httpClient } from '@/utils/http-client.ts';

export function createProcessesSteps(processesSteps: ProcessStepToAdd[]): Promise<ProcessStep[]> {
  return httpClient(HttpMethod.POST, '/processes/steps', {
    schema: z.array(processStepSchema),
    body: processesSteps,
  });
}
