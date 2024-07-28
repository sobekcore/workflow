import { HttpMethod } from '@/enums/http.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { httpClient } from '@/utils/http-client.ts';

export function readExecutions(): Promise<Execution[]> {
  return httpClient<Execution[]>(HttpMethod.GET, '/executions');
}
