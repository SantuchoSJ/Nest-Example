/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */

module.exports = {
  collectCoverageFrom: [
    "src/**",
    "!src/main.ts",
    "!src/**/*.module.ts",
    //delete this when using archtype
    "!src/repository/generic.repository.ts",
    "!src/repository/repository.exception.ts",
    "!src/features/companies/domain/company.repository.ts",
    "!src/features/users/domain/user.repository.ts",
  ],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  modulePaths: ["<rootDir>"],
  modulePathIgnorePatterns: [],
  preset: "ts-jest",
  rootDir: "./",
  testEnvironment: "node",
  testRegex: ".*\\.test\\.ts",
  transform: { ".*\\.(t|j)s.$": "ts-jest" },
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/$1",
    "^@common/(.*)$": "<rootDir>/src/common/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@repository/(.*)$": "<rootDir>/src/repository/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@test/(.*)$": "<rootDir>/test/$1",
  },
};
