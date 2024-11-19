import { ColorWithUses, ReplaceGroup } from "../../types/colors";

const getColorDistance = (color1: ColorWithUses, color2: ColorWithUses) => {
  const r1 = color1.r / 255;
  const g1 = color1.g / 255;
  const b1 = color1.b / 255;
  const a1 = color1.a;

  const r2 = color2.r / 255;
  const g2 = color2.g / 255;
  const b2 = color2.b / 255;
  const a2 = color2.a;

  return Math.sqrt(
    Math.pow(r1 - r2, 2) +
      Math.pow(g1 - g2, 2) +
      Math.pow(b1 - b2, 2) +
      Math.pow(a1 - a2, 2)
  );
};

const totalUses = (color: ReplaceGroup) => {
  return (
    color.to.uses.length + color.from.reduce((acc, c) => acc + c.uses.length, 0)
  );
};

export function getReplaceGroups(
  colorsWithUses: ColorWithUses[],
  amount: number
) {
  const threshold = amount / 100;

  const groups: ColorWithUses[][] = colorsWithUses.reduce((acc, color) => {
    const groupIndex = acc.findIndex((group) =>
      group.some((c) => getColorDistance(c, color) <= threshold)
    );

    if (groupIndex >= 0) {
      acc[groupIndex].push(color);
    } else {
      acc.push([color]);
    }

    return acc;
  }, [] as ColorWithUses[][]);

  const replaceGroups = groups.map((group) => {
    const sortedGroup = [...group].sort((a, b) => {
      if (a.variable?.id && !b.variable?.id) return -1;
      if (!a.variable?.id && b.variable?.id) return 1;
      return b.uses.length - a.uses.length;
    });
    const mostUsedColor = sortedGroup[0];
    const otherColors = sortedGroup.slice(1);

    return {
      from: otherColors,
      to: mostUsedColor,
    };
  });

  return replaceGroups
    .sort((a, b) => totalUses(b) - totalUses(a))
    .filter((group) => group.from.length > 1);
}
