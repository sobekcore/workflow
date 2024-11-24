import { HttpMethod } from '@/enums/http.ts';
import { ProcessStepToAssign } from '@/interfaces/process-step/process-step.ts';
import { httpClient } from '@/utils/http-client.ts';

export function assignProcessesSteps(processes: ProcessStepToAssign[]): Promise<void> {
  return httpClient(HttpMethod.PATCH, '/processes/steps/assign', {
    body: processes,
  });
}
