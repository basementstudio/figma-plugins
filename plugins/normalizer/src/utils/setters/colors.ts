import { ColorWithUses, ReplaceGroup } from "../../types/colors";
import { clone } from "../clone";
import { rgbToHex } from "../colors";

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
  