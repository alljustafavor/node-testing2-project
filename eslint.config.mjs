import globals from "globals";
import pluginJs from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: { ...globals.node, ...globals.jest } } },
  pluginJs.configs.recommended,
  ...jestPlugin.configs["flat/recommended"],
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    plugins: {
      jest: jestPlugin,
    },
    rules: {
    },
  },
];
