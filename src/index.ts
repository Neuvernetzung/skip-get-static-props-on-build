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

type ProtectStaticPropsOnBuildCallback<TProps> = () =>
  | GetStaticPropsResult<TProps>
  | Promise<GetStaticPropsResult<TProps>>;

type ProtectGetStaticPropsOnBuildReturn<TProps> =
  | { skip: true; returned?: never }
  | { skip: false; returned: GetStaticPropsResult<TProps> };

export const protectStaticPropsOnBuild = async <TProps>(
  callback: ProtectStaticPropsOnBuildCallback<TProps>
): Promise<ProtectGetStaticPropsOnBuildReturn<TProps>> => {
  try {
    const returned = await callback();
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

type ProtectStaticPathsOnBuildCallback<TParams extends ParsedUrlQuery> = () =>
  | GetStaticPathsResult<TParams>
  | Promise<GetStaticPathsResult<TParams>>;

type ProtectGetStaticPathsOnBuildReturn<TParams extends ParsedUrlQuery> =
  | { skip: true; returned?: never }
  | { skip: false; returned: GetStaticPathsResult<TParams> };

export const protectStaticPathsOnBuild = async <TParams extends ParsedUrlQuery>(
  callback: ProtectStaticPathsOnBuildCallback<TParams>
): Promise<ProtectGetStaticPathsOnBuildReturn<TParams>> => {
  try {
    const returned = await callback();
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
