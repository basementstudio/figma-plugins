declare module '*.svg' {
  const content: any;
  export default content;
}

interface Point {
  x: number;
  y: number;
  angle?: number; // in degrees
  dist?: number; //distance from last point
  totalDist?: number; //total length of curve up to this point
}

interface SettingsData {
  textSize: number | undefined;
  textWeight: 'normal' | 'bold';
  verticalAlign: number;
  horizontalAlign: number;
  spacing: number;
  count: number;
  rotCheck?: boolean;
  autoWidth: boolean;
  totalLength?: number;
  isLoop?: boolean;
  objWidth?: number;
  offset: number;
  precision: number;
  reverse: boolean;
}

type SettingsKeys = keyof SettingsData;

interface Pass {
  spacing: number;
  pointIndex: number;
  defaultRot: number;
}

type DataType = 'clone' | 'text';

type SelectionCases = 'one' | 'nothing' | 'vectornetwork' | 'nocurve' | 'toomany' | 'text' | 'clone' | 'linklost';

type OffsetAlign = 'left' | 'center' | 'right';

interface LinkedData {
  readonly namespace: 'topathfigma';
  setting: SettingsData;
  curve: VectorNode;
  other: TextNode;
  curveCloneID?: string;
  readonly type: DataType;
}
