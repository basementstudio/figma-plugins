export interface TextStyle {
  nodeId: string;
  fontName: FontName;
  fontSize: number;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
  textCase?: TextCase;
  textDecoration?: TextDecoration;
  paragraphSpacing?: number;
  paragraphIndent?: number;
  textAlignHorizontal?: string;
  textAlignVertical?: string;
}

export interface TextStyleWithUses {
  id: string;
  fontName: FontName;
  fontSize: number;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
  textCase?: TextCase;
  textDecoration?: TextDecoration;
  paragraphSpacing?: number;
  paragraphIndent?: number;
  textAlignHorizontal?: string;
  textAlignVertical?: string;
  uses: Array<{ nodeId: string }>;
}
