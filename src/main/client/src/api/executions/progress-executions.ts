import { HttpMethod } from '@/enums/http.ts';
import { ExecutionToProgress } from '@/interfaces/execution/execution.ts';
import { httpClient } from '@/utils/http-client.ts';

export function progressExecutions(executions: ExecutionToProgress[]): Promise<void> {
  return httpClient(HttpMethod.PATCH, '/executions/progress', {
    body: executions,
  });
}
