import { HttpMethod } from '@/enums/http.ts';
import { Process, ProcessToAdd } from '@/interfaces/process.ts';
import { httpClient } from '@/utils/http-client.ts';

export function createProcesses(processes: ProcessToAdd[]): Promise<Process[]> {
  return httpClient<Process[]>(HttpMethod.POST, '/processes', {
    body: processes,
  });
}
