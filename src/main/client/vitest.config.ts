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
      restoreMocks: true,
      environment: 'jsdom',
      css: true,
      setupFiles: ['./test/setup.ts'],
    },
  }),
);
