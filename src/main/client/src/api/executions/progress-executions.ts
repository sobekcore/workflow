import { HttpMethod } from '@/enums/http.ts';
import { ExecutionToProgress } from '@/interfaces/execution.ts';
import { httpClient } from '@/utils/http-client.ts';

export function progressExecutions(executions: ExecutionToProgress[]): Promise<void> {
  return httpClient<void>(HttpMethod.PATCH, '/executions/progress', {
    body: executions,
  });
}
