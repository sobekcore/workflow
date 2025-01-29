import { z } from 'zod';
import { HttpMethod } from '@/enums/http.ts';
import { Process, ProcessToUpdate } from '@/interfaces/process.ts';
import { processSchema } from '@/schemas/process.ts';
import { httpClient } from '@/utils/http-client.ts';

export function updateProcesses(processes: ProcessToUpdate[]): Promise<Process[]> {
  return httpClient(HttpMethod.PUT, '/processes', {
    schema: z.array(processSchema),
    body: processes,
  });
}
