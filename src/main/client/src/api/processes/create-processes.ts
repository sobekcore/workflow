import { z } from 'zod';
import { HttpMethod } from '@/enums/http.ts';
import { Process, ProcessToCreate } from '@/interfaces/process.ts';
import { processSchema } from '@/schemas/process.ts';
import { httpClient } from '@/utils/http-client.ts';

export function createProcesses(processes: ProcessToCreate[]): Promise<Process[]> {
  return httpClient(HttpMethod.POST, '/processes', {
    schema: z.array(processSchema),
    body: processes,
  });
}
