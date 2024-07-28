/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Restore eslint 9.x using flat config once typescript-eslint is updated.
 */
const js = require("@eslint/js");
const ts = require("typescript-eslint");
const prettierPlugin = require("eslint-config-prettier");
const importPlugin = require("eslint-plugin-import");

/** @type { import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    files: ["lib/**/*.ts"],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      eslint: js,
      "typescript-eslint": ts,
      import: importPlugin,
      prettier: prettierPlugin
    },
    ignores: ["node_modules/**/*", "dist/**/*", "eslint.config.js"],
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
      "import/resolver": {
        node: {
          extensions: [".ts", ".js"]
        },
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json"
        }
      },
      "import/extensions": [".ts", ".tsx", ".js"],
      "import/order": ["error"]
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true }
      ],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "type", "parent", "sibling"],
          warnOnUnassignedImports: true,
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            orderImportKind: "asc"
          }
        }
      ]
    },
    ignores: ["node_modules", "dist"]
  },
  ...ts.configs.recommended
];
