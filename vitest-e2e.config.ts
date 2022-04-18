import tsPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [tsPaths()],
  resolve: {
    alias: {
      'zx-cjs': require.resolve('zx'),
    },
  },
  test: {
    include: ['test/**/*.e2e-{spec,test}.ts'],
  },
})
