import { HttpMethod } from '@/enums/http.ts';
import { ProcessStep, ProcessStepToAdd } from '@/interfaces/process-step.ts';
import { httpClient } from '@/utils/http-client.ts';

export function createProcessesSteps(processesSteps: ProcessStepToAdd[]): Promise<ProcessStep[]> {
  return httpClient<ProcessStep[]>(HttpMethod.POST, '/processes/steps', {
    body: processesSteps,
  });
}
