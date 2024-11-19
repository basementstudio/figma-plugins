import {
  colorsToColorsWithUses,
  getColors,
  getVariables,
  replaceAll,
  replaceColor,
} from "./utils/getters";

figma.showUI(__html__, { height: 600, width: 350 });

const onSelectionChange = async (): Promise<void> => {
  const selectedComponents: readonly SceneNode[] = figma.currentPage.selection;
  const collections = figma.variables.getLocalVariableCollections();

  const colorsWithUses = await Promise.all(selectedComponents.map(getColors))
    .then((colors) => colorsToColorsWithUses(colors.flat()))
    .catch(() => []);

  const variables = getVariables(collections);

  figma.ui.postMessage({
    type: "selection-change",
    colorsWithUses,
    variables,
  });
};

figma.on("selectionchange", onSelectionChange);
figma.on("run", onSelectionChange);

figma.ui.onmessage = async (message) => {
  if (message.type === "replace-color") {
    replaceColor(message.originalColor, message.newColor);

    return onSelectionChange();
  }

  if (message.type === "replace-all") {
    replaceAll(message.colorsGroups);

    return onSelectionChange();
  }
};
