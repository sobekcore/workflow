import { z } from 'zod';
import { HttpMethod } from '@/enums/http.ts';
import { Execution, ExecutionToCreate } from '@/interfaces/execution/execution.ts';
import { executionSchema } from '@/schemas/execution/execution.ts';
import { httpClient } from '@/utils/http-client.ts';

export function createExecutions(executions: ExecutionToCreate[]): Promise<Execution[]> {
  return httpClient(HttpMethod.POST, '/executions', {
    schema: z.array(executionSchema),
    body: executions,
  });
}
