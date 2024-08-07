export const ALL_SELECTION_CASES: {
  [key in SelectionCases]: string;
} = {
  one: 'please select two things',
  nothing: 'nothing selected',
  vectornetwork: 'multiple curves not supported',
  nocurve: 'please select a curve',
  toomany: 'please select only two things',
  text: 'curve and text selected',
  clone: 'curve and object selected',
  linklost: 'unable to find linked object(s)',
};

export const SETTINGS_DEFAULT: SettingsData = {
  textSize: 16,
  textWeight: undefined,
  verticalAlign: 0.5,
  horizontalAlign: 0.5,
  spacing: 20,
  count: 5,
  autoWidth: true,
  totalLength: 0,
  isLoop: false,
  objWidth: 0,
  offset: 0,
  rotCheck: true,
  precision: 420,
  reverse: false,
};
