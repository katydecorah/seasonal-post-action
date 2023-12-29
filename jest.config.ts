import type { Config } from "jest";

const config: Config = {
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  prettierPath: "<rootDir>/node_modules/prettier-2/index.js",
};

export default config;
