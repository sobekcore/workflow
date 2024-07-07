import { HttpMethod } from '@/enums/http.ts';
import { Process } from '@/interfaces/process.ts';
import { httpClient } from '@/utils/http-client.ts';

export function readProcesses(): Promise<Process[]> {
  return httpClient<Process[]>(HttpMethod.GET, '/processes');
}
