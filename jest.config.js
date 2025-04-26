module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!expo-modules-core|react-native|@react-native|@react-navigation|nativewind)/',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
