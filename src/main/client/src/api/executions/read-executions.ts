import { z } from 'zod';
import { HttpMethod } from '@/enums/http.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { executionSchema } from '@/schemas/execution/execution.ts';
import { httpClient } from '@/utils/http-client.ts';

export function readExecutions(): Promise<Execution[]> {
  return httpClient(HttpMethod.GET, '/executions', {
    schema: z.array(executionSchema),
  });
}
