import { TextStyle, TextStyleWithUses } from "../../types/texts";


function getTextStyleKey(style: TextStyle): string {
  return JSON.stringify({
    fontName: style.fontName,
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
    textCase: style.textCase,
    textDecoration: style.textDecoration,
    paragraphSpacing: style.paragraphSpacing,
    paragraphIndent: style.paragraphIndent,
  });
}

function findNodesWithText(node: SceneNode): SceneNode[] {
  if (node.type === "FRAME" || node.type === "GROUP") {
    return (node as FrameNode | GroupNode).findAllWithCriteria({
      types: ["TEXT"],
    });
  }
  return [];
}

function extractTextStyleFromNode(node: SceneNode) {
  if (node.type !== "TEXT") return null;

  return {
    nodeId: node.id,
    fontName: node.fontName,
    fontSize: node.fontSize,
    lineHeight: node.lineHeight,
    letterSpacing: node.letterSpacing,
    textCase: node.textCase,
    textDecoration: node.textDecoration,
    paragraphSpacing: node.paragraphSpacing,
    paragraphIndent: node.paragraphIndent,
    textAlignHorizontal: node.textAlignHorizontal,
    textAlignVertical: node.textAlignVertical,
  };
}

export function textStylesToStylesWithUses(
  styles: TextStyle[]
): TextStyleWithUses[] {
  return styles.reduce((acc, style) => {
    const styleId = getTextStyleKey(style);
    const existingStyle = acc.find((s) => s.id === styleId);

    if (existingStyle) {
      existingStyle.uses.push({ nodeId: style.nodeId });
    } else {
      acc.push({
        ...style,
        id: styleId,
        uses: [{ nodeId: style.nodeId }],
      });
    }

    return acc;
  }, []);
}

export async function getTextStyles(
  node: SceneNode
): Promise<Array<TextStyle>> {
  const nodesWithText = [node, ...findNodesWithText(node)];
  const textStyles = nodesWithText
    .map(extractTextStyleFromNode)
    .filter((style): style is NonNullable<ReturnType<typeof extractTextStyleFromNode>> => style !== null);
  return textStyles as TextStyle[];
}
