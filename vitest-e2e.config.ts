import swc from 'rollup-plugin-swc'
import tsPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const swcPlugin = (() => {
  const plugin = swc({
    test: 'ts',
    jsc: {
      parser: {
        syntax: 'typescript',
        dynamicImport: true,
        decorators: true,
      },
      target: 'es2021',
      transform: {
        decoratorMetadata: true,
      },
    },
  })

  const originalTransform = plugin.transform!

  const transform = function (...args: Parameters<typeof originalTransform>) {
    if (!args[1].endsWith('html')) return originalTransform.apply(this, args)
  }

  return { ...plugin, transform }
})()

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [tsPaths(), swcPlugin],
  resolve: {
    alias: {
      'zx-cjs': require.resolve('zx'),
    },
  },
  test: {
    include: ['test/**/*.e2e-{spec,test}.ts'],
  },

  // esbuild can not emit ts metadata
  esbuild: false,
})
