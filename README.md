# skip-get-static-props-on-build

The `skip-get-static-props-on-build` package for TypeScript and Next.js is designed to help developers handle situations where a Next.js app is deployed, but the content management system (CMS) is not yet live during the build process. This package allows you to skip the execution of `getStaticProps` and revalidate it later when the CMS becomes live.

## Installation

You can install this package using npm or yarn:

```bash
npm install skip-get-static-props-on-build
# or
yarn add skip-get-static-props-on-build
```

## Usage

### `protectStaticPropsOnBuild`

This function wraps your `getStaticProps` logic and provides error handling for situations where you are in the build process.

```typescript
import { protectStaticPropsOnBuild } from "skip-get-static-props-on-build";
import type { GetStaticProps } from "next";

type Props = { test: string };

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { skip, returned } = await protectStaticPropsOnBuild<Props>(() => {
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
import { protectStaticPathsOnBuild } from "skip-get-static-props-on-build";
import type { GetStaticPaths } from "next";

type Params = { id: string };

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { skip, returned } = await protectStaticPathsOnBuild<Params>(() => {
    const paths = [{ params: { id: "1" } }];

    return { paths, fallback: "blocking" };
  });

  if (skip) return { paths: [], fallback: "blocking" };

  return returned;
};
```

## Contributing

Feel free to contribute to this package on [GitHub](https://github.com/Neuvernetzung/skip-get-static-props-on-build).

## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/Neuvernetzung/skipGetStaticPropsOnBuild/blob/master/LICENSE) file for details.
