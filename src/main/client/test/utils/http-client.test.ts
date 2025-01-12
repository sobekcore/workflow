import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { HttpMethod } from '@/enums/http.ts';
import { Process } from '@/interfaces/process.ts';
import { processSchema } from '@/schemas/process.ts';
import { httpClient } from '@/utils/http-client.ts';

const process: Process = {
  ...mockProcess(),
  steps: [
    {
      ...mockProcessStep(),
      prevProcessStep: undefined,
      availableFrom: undefined,
    },
  ],
};
const fetch = vi.fn(
  (): Promise<Partial<Response>> =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(process),
    }),
);
Object.defineProperty(window, 'fetch', {
  value: fetch,
});

test('should return data when success', async () => {
  expect(await httpClient(HttpMethod.GET, '/url')).toEqual(process);
});

test('should parse data according to schema when success', async () => {
  expect(
    await httpClient(HttpMethod.GET, '/url', {
      schema: processSchema,
    }),
  ).toEqual(process);
});

test('should return null when unauthorized', async () => {
  fetch.mockImplementation(() =>
    Promise.resolve({
      ok: false,
      status: 401,
    }),
  );

  expect(await httpClient(HttpMethod.GET, '/url')).toBeNull();
});

test('should throw exception when error', async () => {
  fetch.mockImplementation(() =>
    Promise.resolve({
      ok: false,
      status: 500,
    }),
  );

  await expect(() => httpClient(HttpMethod.GET, '/url')).rejects.toThrow();
});
