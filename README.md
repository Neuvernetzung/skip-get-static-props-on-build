# skipGetStaticPropsOnBuild

The `skipGetStaticPropsOnBuild` package for TypeScript and Next.js is designed to help developers handle situations where a Next.js app is deployed, but the content management system (CMS) is not yet live during the build process. This package allows you to skip the execution of `getStaticProps` and revalidate it later when the CMS becomes live.

## Installation

You can install this package using npm or yarn:

```bash
npm install skipgetstaticpropsonbuild
# or
yarn add skipgetstaticpropsonbuild
```

## Usage

### `protectStaticPropsOnBuild`

This function wraps your `getStaticProps` logic and provides error handling for situations where you are in the build process.

```typescript
import { protectStaticPropsOnBuild } from "skipGetStaticPropsOnBuild";
import type { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<{ test: string }> = async () => {
  const { skip, returned } = protectStaticPropsOnBuild(() => {
    const test = "2";

    return { props: { test } };
  });
  if (skip) return { notFound: true, revalidate: 1 };

  return returned;
};
```

### `protectStaticPathsOnBuild`

Similar to `protectStaticPropsOnBuild`, this function wraps your `getStaticPaths` logic and provides error handling for situations where you are in the build process.

```typescript
import { protectStaticPathsOnBuild } from "skipGetStaticPropsOnBuild";
import type { GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const { skip, returned } = protectStaticPathsOnBuild(() => {
    const paths = [{ params: { id: "1" } }];

    return { paths, fallback: "blocking" };
  });

  if (skip) return { paths: [], fallback: "blocking" };

  return returned;
};
```

## Contributing

Feel free to contribute to this package on [GitHub](https://github.com/Neuvernetzung/skipGetStaticPropsOnBuild).

## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/Neuvernetzung/skipGetStaticPropsOnBuild/blob/master/LICENSE) file for details.
