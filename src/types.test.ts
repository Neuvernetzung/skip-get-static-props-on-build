import { protectStaticPathsOnBuild, protectStaticPropsOnBuild } from "index";
import type { GetStaticPaths, GetStaticProps } from "next";

type Props = { test: string };
type Params = { id: string };

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const id = ctx.params?.id;

  const { skip, returned } = await protectStaticPropsOnBuild(() => {
    const test = String(id);

    return { props: { test } };
  });
  if (skip) return { notFound: true, revalidate: 1 };

  return returned;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { skip, returned } = await protectStaticPathsOnBuild(() => {
    const paths = [{ params: { id: "1" } }];

    return { paths, fallback: "blocking" };
  });

  if (skip) return { paths: [], fallback: "blocking" };

  return returned;
};

// Errort aus

// @ts-expect-error Ein Error soll hier passieren, da test kein String ist sondern eine Zahl
export const getStaticPropsError: GetStaticProps<Props, Params> = async (
  ctx
) => {
  const id = ctx.params?.id;

  const { skip, returned } = await protectStaticPropsOnBuild(() => {
    const test = Number(id);

    return { props: { test } };
  });
  if (skip) return { notFound: true, revalidate: 1 };

  return returned;
};

// @ts-expect-error Ein Error soll hier passieren, da test kein String ist sondern eine Zahl
export const getStaticPathsError: GetStaticPaths<Params> = async () => {
  // @ts-expect-error Ein Error soll hier passieren, da test kein String ist sondern eine Zahl
  const { skip, returned } = await protectStaticPathsOnBuild(() => {
    const paths = [{ params: { id: 1 } }];

    return { paths, fallback: "blocking" };
  });

  if (skip) return { paths: [], fallback: "blocking" };

  return returned;
};
