const globals = require("globals");
const pluginJs = require("@eslint/js");
const eslintPluginPrettier = require("eslint-plugin-prettier");

module.exports = [
  { files: ["**/*.{js,mjs,cjs}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          arrowParens: "always",
          semi: true,
          trailingComma: "none",
          tabWidth: 2,
          endOfLine: "auto",
          useTabs: false,
          singleQuote: false,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ]
    },
    ignores: ["**/node_modules/", "**/dist/"]
  }
];
