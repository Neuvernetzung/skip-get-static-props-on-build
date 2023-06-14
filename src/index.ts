import type { GetStaticPropsResult } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

type SkipGetStaticPropsOnBuildReturn =
  | {
      skip: true;
      returned: GetStaticPropsResult<any>;
    }
  | { skip: false; returned?: never };

type SkipGetStaticPropsOnBuildProps<TProps> = {
  defaultProps?: TProps;
  revalidate?: number;
};

export const skipGetStaticPropsOnBuild = <TProps>({
  defaultProps,
  revalidate,
}: SkipGetStaticPropsOnBuildProps<TProps>): SkipGetStaticPropsOnBuildReturn => {
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    return {
      skip: true,
      returned: { props: defaultProps || {}, revalidate: revalidate || 60 },
    };
  }
  return { skip: false };
};
