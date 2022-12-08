module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
};
