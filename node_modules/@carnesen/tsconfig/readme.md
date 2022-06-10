# @carnesen/tsconfig

[![Build Status](https://github.com/carnesen/tsconfig/workflows/test/badge.svg)](https://github.com/carnesen/tsconfig/actions?query=workflow%3Atest+branch%3Amaster)
TypeScript configurations for `@carnesen` projects

## Install

```
npm install --save-dev typescript @carnesen/tsconfig
```

## Usage

These instructions assume that you're using TypeScript >=[3.2 with support for "tsconfig.json inheritance via Node.js packages"](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html). 

Create a file `tsconfig.json` at the root of your project with contents:

```json
{
  "extends": "@carnesen/tsconfig"
}
```
Add your own `compilerOptions` or any other properties described [here in the TypeScript docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

The `@carnesen/tsconfig` [base configuration](tsconfig.json) sets some desirable non-default values such as `"strict": true`. It also enumerates as comments most of the other available configuration options. The base configuration can be used directly as `"extends": "@carnesen/tsconfig"`. The configuration sets "es2020" as the compiler target, suitable for use with Node.js >=14 or modern browsers.

## More information

If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on [this project's repository on GitHub](https://github.com/carnesen/tsconfig).

## Related

- [@carnesen/eslint-config](https://github.com/carnesen/eslint-config): ESLint configurations for `@carnesen` projects

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
