import { ColorWithUses } from "../types/colors";

export const sortColorsByUsageAndVariables = (
  a: ColorWithUses,
  b: ColorWithUses
): number => {
  if (b.uses.length !== a.uses.length) return b.uses.length - a.uses.length;

  return b.variable ? 1 : a.variable ? -1 : 0;
};
