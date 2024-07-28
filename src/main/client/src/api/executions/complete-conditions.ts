import { HttpMethod } from '@/enums/http.ts';
import { ConditionToComplete } from '@/interfaces/execution/condition.ts';
import { httpClient } from '@/utils/http-client.ts';

export function completeConditions(conditions: ConditionToComplete[]): Promise<void> {
  return httpClient<void>(HttpMethod.PATCH, '/executions/conditions/complete', {
    body: conditions,
  });
}
