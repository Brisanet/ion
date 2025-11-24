import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/_backup/'],
  testMatch: ['<rootDir>/projects/ion/**/*.spec.ts'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'projects/ion/src/**/*.ts',
    '!projects/ion/src/**/*.spec.ts',
    '!projects/ion/src/public-api.ts',
  ],
  moduleNameMapper: {
    '^ion$': '<rootDir>/dist/ion',
  },
  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
};

export default config;
