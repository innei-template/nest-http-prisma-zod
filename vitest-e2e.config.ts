import { defineConfig } from 'vitest/config'
import tsPaths from 'vite-tsconfig-paths'
export default defineConfig({
  plugins: [tsPaths()],
  test: {
    include: ['test/**/*.e2e-{spec,test}.ts'],
  },
})
