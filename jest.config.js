module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest'
    },
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)',  // Make an exception for 'axios'
    ],
  };
  