import { Config } from "../..";

export const FIELDS = [
  {
    sectionTitle: "Color",
    fields: [
      {
        label: "Threshold",
        key: "colorThreshold",
        type: "slider",
        min: 1,
        max: 100,
      },
    ],
  },
  {
    sectionTitle: "Text",
    fields: [
      {
        label: "Font",
        key: "replaceFont",
        type: "switch",
      },
      {
        label: "Size",
        key: "replaceSize",
        type: "switch",
      },
      {
        label: "Size threshold",
        key: "sizeThreshold",
        type: "slider",
        min: 1,
        max: 30,
        disabledIf: (config: Config) => !config.replaceSize,
      },
      {
        label: "Line height",
        key: "replaceLineHeight",
        type: "switch",
      },
      {
        label: "Letter spacing",
        key: "replaceLetterSpacing",
        type: "switch",
      },
      {
        label: "Text case",
        key: "replaceTextCase",
        type: "switch",
      },
      {
        label: "Text decoration",
        key: "replaceTextDecoration",
        type: "switch",
      },
      {
        label: "Align horizontal",
        key: "replaceTextAlignHorizontal",
        type: "switch",
      },
      {
        label: "Align vertical",
        key: "replaceTextAlignVertical",
        type: "switch",
      },
      {
        label: "Paragraph spacing",
        key: "replaceParagraphSpacing",
        type: "switch",
      },
      {
        label: "Paragraph indent",
        key: "replaceParagraphIndent",
        type: "switch",
      },
    ],
  },
];
