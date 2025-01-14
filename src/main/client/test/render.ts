import { cleanup, render as renderFn, renderHook as renderHookFn } from '@testing-library/react';

export function render(...params: Parameters<typeof renderFn>) {
  vi.clearAllMocks();
  cleanup();

  return renderFn(...params);
}

export function renderHook<T, P>(...params: Parameters<typeof renderHookFn<T, P>>) {
  vi.clearAllMocks();
  cleanup();

  return renderHookFn(...params);
}
