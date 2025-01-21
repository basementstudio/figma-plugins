import { ColorWithUses, ReplaceColorGroup } from "../../types/colors";
import { TextStyleWithUses } from "../../types/texts";
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

export async function replaceText(
  originalText: TextStyleWithUses,
  newText: TextStyleWithUses
) {
  for (const use of originalText.uses) {
    const node = figma.getNodeById(use.nodeId);

    if (node && "fontName" in node) {
      // Check for missing fonts
      if (node.hasMissingFont) {
        console.warn(`Node ${node.id} has missing fonts. Skipping...`);
        continue;
      }

      // Load all necessary fonts before modifying text properties
      try {
        await Promise.all(
          node.getRangeAllFontNames(0, node.characters.length)
            .map(figma.loadFontAsync)
        );
        // Also load the new font we want to apply
        await figma.loadFontAsync(newText.fontName);
      } catch (error) {
        console.error(`Failed to load fonts for node ${node.id}:`, error);
        continue;
      }

      const textProperties = {
        fontName: newText.fontName,
        fontSize: newText.fontSize,
        ...(newText.lineHeight && { lineHeight: newText.lineHeight }),
        ...(newText.letterSpacing && { letterSpacing: newText.letterSpacing }),
        ...(newText.textCase && { textCase: newText.textCase }),
        ...(newText.textDecoration && {
          textDecoration: newText.textDecoration,
        }),
        ...(newText.paragraphSpacing && {
          paragraphSpacing: newText.paragraphSpacing,
        }),
        ...(newText.paragraphIndent && {
          paragraphIndent: newText.paragraphIndent,
        }),
        ...(newText.textAlignHorizontal && {
          textAlignHorizontal: newText.textAlignHorizontal,
        }),
        ...(newText.textAlignVertical && {
          textAlignVertical: newText.textAlignVertical,
        }),
      };

      Object.entries(textProperties).forEach(([key, value]) => {
        if (key in node && value !== undefined) {
          node[key] = value;
        }
      });
    }
  }
}

export function replaceAll(colorsGroups: ReplaceColorGroup[]) {
  colorsGroups.forEach((group) => {
    group.from.forEach((color) => {
      replaceColor(color, group.to);
    });
  });
}
