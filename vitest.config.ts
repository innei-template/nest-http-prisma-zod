import { cpSync, existsSync } from 'fs'
import path, { resolve } from 'path'
import swc from 'unplugin-swc'
import tsconfigPath from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

if (
  existsSync(
    path.resolve(__dirname, '../../node_modules/.cache/redis-memory-server'),
  )
) {
  cpSync(
    path.resolve(__dirname, '../../node_modules/.cache/redis-memory-server'),
    path.resolve(__dirname, './node_modules/.cache/redis-memory-server'),
    { recursive: true },
  )
}

export default defineConfig({
  root: './test',
  test: {
    include: ['**/*.spec.ts', '**/*.e2e-spec.ts'],

    threads: false,
    globals: true,
    setupFiles: [resolve(__dirname, './test/setup-file.ts')],
    environment: 'node',
    includeSource: [resolve(__dirname, './test')],
  },
  optimizeDeps: {
    needsInterop: ['lodash'],
  },
  resolve: {
    alias: {
      'zx-cjs': 'zx',
      '~/app.config': resolve(__dirname, './src/app.config.testing.ts'),
    },
  },

  // esbuild can not emit ts metadata
  esbuild: false,

  plugins: [
    swc.vite(),
    tsconfigPath({
      projects: [
        resolve(__dirname, './test/tsconfig.json'),
        resolve(__dirname, './tsconfig.json'),
      ],
    }),
  ],
})
