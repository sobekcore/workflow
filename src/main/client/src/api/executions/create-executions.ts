import { HttpMethod } from '@/enums/http.ts';
import { Execution, ExecutionToCreate } from '@/interfaces/execution.ts';
import { httpClient } from '@/utils/http-client.ts';

export function createExecutions(executions: ExecutionToCreate[]): Promise<Execution[]> {
  return httpClient<Execution[]>(HttpMethod.POST, '/executions', {
    body: executions,
  });
}
