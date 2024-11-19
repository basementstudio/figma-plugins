import { getColorKey } from "../components/home/utils";
import { ColorUse, ColorWithUses, ReplaceGroup } from "../types/colors";
import { clone } from "./clone";
import { convertToRGBScale, rgbToHex } from "./colors";

export async function getColors(node: SceneNode): Promise<Array<ColorUse>> {
  const nodesWithPaint = [node, ...findNodesWithPaint(node)];
  const componentColors = extractColorsFromNodes(nodesWithPaint);
  return componentColors;
}

export function colorsToColorsWithUses(
  colors: ColorUse[]
): Array<ColorWithUses> {
  return colors.reduce((acc, color) => {
    const existingColor = acc.find((c) => {
      return c.id === color.id;
    });

    if (existingColor) {
      existingColor.uses.push({
        nodeId: color.nodeId,
        property: color.property,
      });
    } else {
      acc.push({
        ...color,
        uses: [{ nodeId: color.nodeId, property: color.property }],
      });
    }

    return acc;
  }, []);
}

function findNodesWithPaint(node: SceneNode): SceneNode[] {
  if (node.type === "FRAME" || node.type === "GROUP") {
    return (node as FrameNode | GroupNode).findAllWithCriteria({
      types: [
        "RECTANGLE",
        "ELLIPSE",
        "POLYGON",
        "STAR",
        "VECTOR",
        "TEXT",
        "FRAME",
        "COMPONENT",
        "INSTANCE",
      ],
    });
  }

  return [];
}

function extractColorsFromNodes(nodes: SceneNode[]): Array<ColorUse> {
  return nodes.flatMap((node) => [
    ...extractColorsFromProperty(node, "fills"),
    ...extractColorsFromProperty(node, "strokes"),
  ]);
}

function extractColorsFromProperty(
  node: SceneNode,
  property: "fills" | "strokes"
): Array<ColorUse> {
  if (!(property in node) || !Array.isArray(node[property])) return [];

  return node[property]
    .filter((paint) => paint.type === "SOLID")
    .map((paint) => ({
      ...convertToRGBScale(paint.color),
      variable: paint.boundVariables?.color,
      nodeId: node.id,
      property,
    }))
    .map((color) => ({
      ...color,
      id: getColorKey(color),
    }));
}

export function getVariables(collections: VariableCollection[]) {
  return collections.reduce((acc, collection) => {
    const collectionVariables = collection.variableIds
      .map((id) => {
        const variable = figma.variables.getVariableById(id);
        if (variable) {
          const modeId = collection.defaultModeId;
          return {
            id: variable.id,
            name: variable.name,
            type: variable.resolvedType,
            value: convertToRGBScale(variable.valuesByMode[modeId] as RGBA),
          };
        }
        return null;
      })
      .filter((variable) => variable !== null);

    return [...acc, ...collectionVariables];
  }, [] as any[]);
}

/**
 * Replaces the color of all nodes that use a specific color with a new color
 */
export function replaceColor(color: ColorWithUses, newColor: ColorWithUses) {
  color.uses.forEach((use) => {
    const node = figma.getNodeById(use.nodeId);

    if (node && use.property in node) {
      const property = use.property; // 'fills' or 'strokes'
      const properties = node[property];

      if (properties[0]?.type === "SOLID") {
        // Create a deep copy to avoid mutations
        const clonedProperties = clone(properties);
        const newHex = rgbToHex(newColor);

        // Handle color variables if present
        if (newColor.variable) {
          const newSolidPaint = figma.util.solidPaint(
            newHex,
            clonedProperties[0]
          );

          if ("setBoundVariable" in node) {
            const variable = figma.variables.getVariableById(
              newColor.variable.id
            );

            const newSolidPaintWithVariable =
              figma.variables.setBoundVariableForPaint(
                newSolidPaint,
                "color",
                variable
              );

            clonedProperties[0] = newSolidPaintWithVariable;
            node[property] = clonedProperties;
          }
        } else {
          const newSolidPaint = figma.util.solidPaint(newHex, {
            ...clonedProperties[0],
            boundVariables: {},
          });

          clonedProperties[0] = newSolidPaint;
          node[property] = clonedProperties;
        }
      }
    }
  });
}

export function replaceAll(colorsGroups: ReplaceGroup[]) {
  colorsGroups.forEach((group) => {
    group.from.forEach((color) => {
      replaceColor(color, group.to);
    });
  });
}
