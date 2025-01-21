import { TextStyleWithUses } from "./types/texts";
import { colorsToColorsWithUses, getColors } from "./utils/getters/colors";
import {
  getTextStyles,
  textStylesToStylesWithUses,
} from "./utils/getters/fonts";
import { getVariables } from "./utils/getters/variables";
import { replaceAll, replaceColor, replaceText } from "./utils/setters/colors";

figma.showUI(__html__, { height: 600, width: 350 });

const onSelectionChange = async (): Promise<void> => {
  const selectedComponents: readonly SceneNode[] = figma.currentPage.selection;
  const collections = figma.variables.getLocalVariableCollections() || [];
  const variables = getVariables(collections) || [];

  const textStyles = figma.getLocalTextStyles() || [];

  const colorsWithUses = await Promise.all(selectedComponents.map(getColors))
    .then((colors) => colorsToColorsWithUses(colors.flat()))
    .catch(() => []);

  const textWithUses = await Promise.all(selectedComponents.map(getTextStyles))
    .then((styles) => textStylesToStylesWithUses(styles.flat()))
    .catch(() => []);

  figma.ui.postMessage({
    type: "selection-change",
    variables,
    textStyles,
    colorsWithUses,
    textWithUses,
  });
};

figma.on("selectionchange", onSelectionChange);
figma.on("run", onSelectionChange);

figma.ui.onmessage = async (message) => {
  if (message.type === "replace-color") {
    replaceColor(message.originalColor, message.newColor);

    return onSelectionChange();
  }

  if (message.type === "replace-text") {
    replaceText(message.originalFont, message.newFont);

    return onSelectionChange();
  }

  if (message.type === "replace-all") {
    replaceAll(message.colorsGroups);

    return onSelectionChange();
  }
};
