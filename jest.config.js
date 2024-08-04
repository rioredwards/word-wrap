const { defaults } = require("jest-config");

/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFiles: ["<rootDir>/env.js"],
  testPathIgnorePatterns: ["__mocks__"],
};

module.exports = config;
