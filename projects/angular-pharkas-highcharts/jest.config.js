const baseConfig = require('../../jest.config')

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    'angular-pharkas/(.*)': '<rootDir>/projects/angular-pharkas/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globals: {
    'ts-jest': {
      tsconfig:
        '<rootDir>/projects/angular-pharkas-highcharts/tsconfig.spec.json',
    },
  },
}
