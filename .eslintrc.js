module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  plugins: ["svelte3"],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3"
    }
  ],
  rules: {}
};
