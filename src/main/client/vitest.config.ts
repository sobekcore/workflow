/// <reference types="vitest" />
import config from './vite.config';
import { resolve } from 'node:path';
import { defineConfig, mergeConfig } from 'vite';

export default mergeConfig(
  config,
  defineConfig({
    resolve: {
      alias: {
        '@test': resolve(__dirname, 'test'),
      },
    },
    test: {
      globals: true,
      mockReset: true,
      environment: 'jsdom',
      setupFiles: ['./test/setup.ts'],
    },
  }),
);
