[![build status badge](https://github.com/carnesen/error-like/workflows/test/badge.svg)](https://github.com/carnesen/error-like/actions?query=workflow%3Atest+branch%3Amaster)

Handle TypeScript exceptions type-safely

## Usage

To install this package as a dependency in your project, in a shell do:

```
npm install --save @carnesen/error-like
```

This package includes runtime JavaScript files (ES2015) and the corresponding TypeScript type declarations.

```typescript
import { errorLikeFromException } from '@carnesen/error-like';

try {
   fs.writeFileSync("foo.dat", "foo-bar-baz");
} catch (exception) {
   const errorLike = errorLikeFromException(exception);
   if (errorLike.code === "ENOENT") {
      // No such file or directory. This is expected if the file doesn't exist.
   } else {
      throw exception;
   }

}
```

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
