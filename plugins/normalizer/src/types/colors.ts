import { TextStyleWithUses } from "./texts";

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a?: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorElement extends RGB {
  times: number;
  variable?: string;
}

export interface ComponentWithColors {
  id: string;
  name: string;
  colors: ColorElement[];
}

export interface ColorWithUses {
  id: string;
  r: number;
  g: number;
  b: number;
  a?: number;
  variable?: {
    id: string;
    type: string;
  };
  uses: Array<{ nodeId: string; property: "fills" | "strokes" }>;
}

export interface ColorUse {
  id: string;
  r: number;
  g: number;
  b: number;
  a?: number;
  variable?: {
    id: string;
    type: string;
  };
  nodeId: string;
  property: "fills" | "strokes";
}

export interface ReplaceColorGroup {
  from: ColorWithUses[];
  to: ColorWithUses;
}

export interface ReplaceTextGroup {
  from: TextStyleWithUses[];
  to: TextStyleWithUses;
}
