module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: ['node_modules/(?!(your-esm-module)/)'],
    setupFilesAfterEnv: ['./jest.setup.js'],
};