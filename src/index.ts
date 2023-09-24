import type { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import type { ParsedUrlQuery } from "querystring";

type SkipGetStaticPropsOnBuildReturn =
  | {
      skip: true;
    }
  | { skip: false };

export const skipGetStaticPropsOnBuild =
  (): SkipGetStaticPropsOnBuildReturn => ({
    skip: process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD,
  });

type ProtectStaticPropsOnBuildCallback<TProps> =
  () => GetStaticPropsResult<TProps>;

type ProtectGetStaticPropsOnBuildReturn<TProps> =
  | { skip: true; returned?: never }
  | { skip: false; returned: GetStaticPropsResult<TProps> };

export const protectStaticPropsOnBuild = <TProps>(
  callback: ProtectStaticPropsOnBuildCallback<TProps>
): ProtectGetStaticPropsOnBuildReturn<TProps> => {
  try {
    const returned = callback();
    return { skip: false, returned };
  } catch (err) {
    const { skip } = skipGetStaticPropsOnBuild();
    if (skip === true) return { skip };
    throw new Error(
      `You are not in the build process and an error has occurred on getStaticProps.\n${JSON.stringify(
        err
      )}`
    );
  }
};

type ProtectStaticPathsOnBuildCallback<TParams extends ParsedUrlQuery> =
  () => GetStaticPathsResult<TParams>;

type ProtectGetStaticPathsOnBuildReturn<TParams extends ParsedUrlQuery> =
  | { skip: true; returned?: never }
  | { skip: false; returned: GetStaticPathsResult<TParams> };

export const protectStaticPathsOnBuild = <TParams extends ParsedUrlQuery>(
  callback: ProtectStaticPathsOnBuildCallback<TParams>
): ProtectGetStaticPathsOnBuildReturn<TParams> => {
  try {
    const returned = callback();
    return { skip: false, returned };
  } catch (err) {
    const { skip } = skipGetStaticPropsOnBuild();
    if (skip === true) return { skip };
    throw new Error(
      `You are not in the build process and an error has occurred on getStaticPaths.\n${JSON.stringify(
        err
      )}`
    );
  }
};
