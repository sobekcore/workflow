import { z } from 'zod';
import { HttpMethod } from '@/enums/http.ts';
import { Process } from '@/interfaces/process.ts';
import { processSchema } from '@/schemas/process.ts';
import { httpClient } from '@/utils/http-client.ts';

export function readProcesses(): Promise<Process[]> {
  return httpClient(HttpMethod.GET, '/processes', {
    schema: z.array(processSchema),
  });
}
