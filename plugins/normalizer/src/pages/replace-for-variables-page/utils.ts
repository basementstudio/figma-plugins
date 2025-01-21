import { Config } from ".";
import {
  ColorWithUses,
  ReplaceColorGroup,
  ReplaceTextGroup,
} from "../../types/colors";
import { TextStyleWithUses } from "../../types/texts";

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

const totalUses = (color: ReplaceColorGroup) => {
  return (
    color.to.uses.length + color.from.reduce((acc, c) => acc + c.uses.length, 0)
  );
};

export function getReplaceColorGroups(
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

  const ReplaceColorGroups = groups.map((group) => {
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

  return ReplaceColorGroups.sort((a, b) => totalUses(b) - totalUses(a)).filter(
    (group) => group.from.length > 1
  );
}

const isSameObject = (object1: any, object2: any) => {
  return JSON.stringify(object1) === JSON.stringify(object2);
};

const textStylesAreSameGroup = (
  textStyle1: TextStyleWithUses,
  textStyle2: TextStyleWithUses,
  config: Config
) => {
  const isSameFont =
    textStyle1.fontName.family === textStyle2.fontName.family &&
    textStyle1.fontName.style === textStyle2.fontName.style;

  if (!(config.replaceFont || isSameFont)) {
    return false;
  }

  const isSameSize =
    Math.abs(textStyle1.fontSize - textStyle2.fontSize) < config.sizeThreshold;

  if (!(config.replaceSize || isSameSize)) {
    return false;
  }

  const isSameLetterSpacing = isSameObject(
    textStyle1.letterSpacing,
    textStyle2.letterSpacing
  );

  if (!(config.replaceLetterSpacing || isSameLetterSpacing)) {
    return false;
  }

  const isSameTextCase = textStyle1.textCase === textStyle2.textCase;

  if (!(config.replaceTextCase || isSameTextCase)) {
    return false;
  }

  const isSameTextDecoration =
    textStyle1.textDecoration === textStyle2.textDecoration;

  if (!(config.replaceTextDecoration || isSameTextDecoration)) {
    return false;
  }

  const isSameTextAlignHorizontal =
    textStyle1.textAlignHorizontal === textStyle2.textAlignHorizontal;

  if (!(config.replaceTextAlignHorizontal || isSameTextAlignHorizontal)) {
    return false;
  }

  const isSameTextAlignVertical =
    textStyle1.textAlignVertical === textStyle2.textAlignVertical;

  if (!(config.replaceTextAlignVertical || isSameTextAlignVertical)) {
    return false;
  }

  const isSameParagraphSpacing =
    textStyle1.paragraphSpacing === textStyle2.paragraphSpacing;

  if (!(config.replaceParagraphSpacing || isSameParagraphSpacing)) {
    return false;
  }

  const isSameParagraphIndent =
    textStyle1.paragraphIndent === textStyle2.paragraphIndent;

  if (!(config.replaceParagraphIndent || isSameParagraphIndent)) {
    return false;
  }

  return true;
};

export function getReplaceTextGroups(
  textWithUses: TextStyleWithUses[],
  config: Config
): ReplaceTextGroup[] {
  const groups: ReplaceTextGroup[] = [];
  const processed = new Set<string>();

  for (const textStyle of textWithUses) {
    if (processed.has(textStyle.id)) continue;

    const similarStyles = textWithUses.filter(
      (t) => !processed.has(t.id) && textStylesAreSameGroup(t, textStyle, config)
    );

    if (similarStyles.length > 1) {
      const mostUsed = similarStyles.reduce((prev, current) =>
        current.uses > prev.uses ? current : prev
      );

      groups.push({
        from: similarStyles.filter((style) => style.id !== mostUsed.id),
        to: mostUsed,
      });

      similarStyles.forEach((style) => processed.add(style.id));
    }
  }

  return groups;
}
