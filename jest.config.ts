/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import { resolve } from 'path'
import { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  collectCoverageFrom: ['src/modules/*.{js,jsx,ts,tsx}'],
  rootDir: resolve(__dirname, './'),
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],

  maxWorkers: 1,
  testMatch: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
  globalSetup: resolve(__dirname, './test/setup.ts'),
  setupFilesAfterEnv: [resolve(__dirname, './test/setup-file.ts')],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^~/app.config$': resolve(__dirname, './src/app.config.testing.ts'),
    '^~/(.*)$': resolve(__dirname, 'src/$1'),
    '^test/(.*)$': resolve(__dirname, 'test/$1'),
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        diagnostics: false,
        tsconfig: 'tsconfig.json', // 确保这里的路径是正确的
      },
    ],
  },
}

export default config
