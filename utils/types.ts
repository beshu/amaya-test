export type ViewportManager = {
  breakpoint: WritableComputedRef<string, string>;
  breakpointValue: (searchBreakpoint: string) => number;
  isGreaterThan: (searchBreakpoint: string) => boolean;
  isGreaterOrEquals: (searchBreakpoint: string) => boolean;
  isLessThan: (searchBreakpoint: string) => boolean;
  isLessOrEquals: (searchBreakpoint: string) => boolean;
  match: (breakpointToMatch: string) => boolean;
  matches: (...breakpointsToMatch: string[]) => boolean;
};
