# skipGetStaticPropsOnBuild

## Purpose

If a Next.js app is deployed but the CMS is not yet live at the same moment, getStaticProps are skipped and revalidated later when the CMS is live. Default revalidation is `60`.

## Usage

```ts
export const getStaticProps = async () => {
    const { skip, returned } = skipGetStaticPropsOnBuild()
    if(skip) return returned

    return { props: {} }
}
```

Instead of giving back `returned`, you can of course give back something of your own.

skipGetStaticPropsOnBuild has following Props:

`{
  defaultProps?: any;
  revalidate?: number;
}`
