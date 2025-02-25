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
  console.log("onSelectionChange HIII");

  console.log("figma.currentPage", figma.currentPage);
  const selectedComponents: readonly SceneNode[] = figma.currentPage.selection;
  console.log("selectedComponents", selectedComponents);

  console.log("figma.variables", figma.variables);
  const collections = await figma.variables.getLocalVariableCollectionsAsync() || [];

  console.log("collections", collections);
  const variables = getVariables(collections) || [];
  console.log("variables", variables);

  const textStyles = figma.getLocalTextStyles() || [];
  console.log("textStyles", textStyles);

  const colorsWithUses = await Promise.all(selectedComponents.map(getColors))
    .then((colors) => colorsToColorsWithUses(colors.flat()))
    .catch(() => []);

  console.log("colorsWithUses", colorsWithUses);

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

    return setTimeout(onSelectionChange, 1000);
  }

  if (message.type === "replace-all") {
    replaceAll(message.colorsGroups, message.textGroups);

    return setTimeout(onSelectionChange, 1000);
  }
};
