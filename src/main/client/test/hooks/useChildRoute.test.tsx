import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { MockRouterProvider } from '@test/mocks/router.tsx';
import { RenderHookResult, cleanup, renderHook } from '@testing-library/react';
import { Mock } from 'vitest';
import { Process } from '@/interfaces/process.ts';
import { useChildRoute } from '@/hooks/useChildRoute';

const useParamsProcess: Process = {
  ...mockProcess(),
  id: 'use-params-process',
};
const navigate: Mock = vi.fn();
const param: string = 'processId';
const { useRouter, useParams } = vi.hoisted(() => ({
  useRouter: vi.fn(() => ({
    navigate,
  })),
  useParams: vi.fn(() => ({
    [param]: useParamsProcess.id,
  })),
}));
vi.mock('@tanstack/react-router', async (importOriginal) => ({
  ...(await importOriginal()),
  useRouter,
  useParams,
}));

const localStorageProcess: Process = {
  ...mockProcess(),
  id: 'local-storage-process',
};
const getItem: Mock = vi.fn(() => localStorageProcess.id);
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem,
  },
});

const process: Process = mockProcess();
const pathname: string = '/pathname';
let hook: RenderHookResult<ReturnType<typeof useChildRoute>, void>;

beforeEach(() => {
  hook = renderHook(() => useChildRoute([process, useParamsProcess, localStorageProcess], pathname, param), {
    wrapper: ({ children }) => (
      <MockQueryClientProvider>
        <MockRouterProvider>{children}</MockRouterProvider>
      </MockQueryClientProvider>
    ),
  });
});

test('should call navigate and return entity when found in useParams', () => {
  expect(navigate).toHaveBeenCalledWith({
    to: pathname,
    params: {
      [param]: useParamsProcess.id,
    },
  });
  expect(hook.result.current).toEqual(useParamsProcess);
});

test('should call navigate and return entity when found in localStorage', () => {
  useParams.mockImplementation(() => ({
    [param]: '',
  }));

  cleanup();
  hook = renderHook(() => useChildRoute([process, useParamsProcess, localStorageProcess], pathname, param), {
    wrapper: ({ children }) => (
      <MockQueryClientProvider>
        <MockRouterProvider>{children}</MockRouterProvider>
      </MockQueryClientProvider>
    ),
  });

  expect(navigate).toHaveBeenCalledWith({
    to: pathname,
    params: {
      [param]: localStorageProcess.id,
    },
  });
  expect(hook.result.current).toEqual(localStorageProcess);
});

test('should call navigate and return entity when not found in useParams and localStorage', () => {
  useParams.mockImplementation(() => ({
    [param]: '',
  }));

  getItem.mockImplementation(() => '');

  cleanup();
  hook = renderHook(() => useChildRoute([process, useParamsProcess, localStorageProcess], pathname, param), {
    wrapper: ({ children }) => (
      <MockQueryClientProvider>
        <MockRouterProvider>{children}</MockRouterProvider>
      </MockQueryClientProvider>
    ),
  });

  expect(navigate).toHaveBeenCalledWith({
    to: pathname,
    params: {
      [param]: process.id,
    },
  });
  expect(hook.result.current).toEqual(process);
});

test('should return null when entities are empty', () => {
  vi.clearAllMocks();

  cleanup();
  hook = renderHook(() => useChildRoute([], pathname, param), {
    wrapper: ({ children }) => (
      <MockQueryClientProvider>
        <MockRouterProvider>{children}</MockRouterProvider>
      </MockQueryClientProvider>
    ),
  });

  expect(navigate).not.toHaveBeenCalled();
  expect(hook.result.current).toBeNull();
});
