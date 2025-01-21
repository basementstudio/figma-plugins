import { useState } from "react";
import {
  ColorWithUses,
  ReplaceColorGroup,
  ReplaceTextGroup,
} from "../../types/colors";
import ScrollablePageWrapper from "../scrollable-page-wrapper";
import { getReplaceColorGroups, getReplaceTextGroups } from "./utils";
import Color from "../../components/ui/color";
import { cn } from "../../utils/cn";
import Icon from "../../components/ui/icon";
import EmptySelectionMessage from "../../components/empty-selection-message";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import SettingModal from "./components/setting-modal";
import { TextStyleWithUses } from "../../types/texts";
import Font from "../../components/ui/font";

export interface Config {
  colorThreshold: number;
  replaceFont: boolean;
  replaceSize: boolean;
  sizeThreshold: number;
  replaceLineHeight: boolean;
  lineHeightThreshold: number;
  replaceLetterSpacing: boolean;
  letterSpacingThreshold: number;
  replaceTextCase: boolean;
  replaceTextDecoration: boolean;
  replaceTextAlignHorizontal: boolean;
  replaceTextAlignVertical: boolean;
  replaceParagraphSpacing: boolean;
  replaceParagraphIndent: boolean;
}

export default function ReplaceForVariablesPage({
  colorsWithUses = [],
  textWithUses = [],
  variables = [],
  onReplaceAll,
}: {
  colorsWithUses: ColorWithUses[];
  textWithUses: TextStyleWithUses[];
  variables: Variable[];
  onReplaceAll: (colorsGroups: ReplaceColorGroup[]) => void;
}) {
  const [config, setConfig] = useState<Config>({
    colorThreshold: 7,
    replaceFont: true,
    replaceSize: false,
    sizeThreshold: 2,
    replaceLineHeight: false,
    replaceLetterSpacing: false,
    replaceTextCase: false,
    replaceTextDecoration: false,
    replaceTextAlignHorizontal: false,
    replaceTextAlignVertical: false,
    replaceParagraphSpacing: false,
    replaceParagraphIndent: false,
  });

  const { threshold } = config;

  const [parent] = useAutoAnimate({
    duration: 150,
    easing: "ease-in-out",
  });

  const colorsGroups: ReplaceColorGroup[] = getReplaceColorGroups(
    colorsWithUses || [],
    threshold
  );

  const textGroups: ReplaceTextGroup[] = getReplaceTextGroups(
    textWithUses || [],
    config
  );

  console.log("textGroups", textGroups);

  return (
    <ScrollablePageWrapper
      title="Replace for variables"
      rightComponent={
        <div className="w-full flex flex-row justify-end items-center gap-2">
          <SettingModal setConfig={setConfig} config={config} />
        </div>
      }
      bottomComponent={
        <button
          onClick={() => onReplaceAll(colorsGroups)}
          className="bg-gray-950 text-white border border-gray-200/50 p-2 rounded-md text-xs w-full flex flex-row justify-center items-center gap-1 hover:bg-gray-900 transition-all duration-100"
        >
          <Icon.Replace className="w-4 h-4" color="#fff" />
          <span className="text-xs leading-none font-medium">Replace all</span>
        </button>
      }
    >
      <EmptySelectionMessage show={colorsWithUses.length === 0} />
      <div
        className={cn(
          "flex flex-col justify-center items-center w-full h-full gap-2 pb-20 absolute top-0 left-0 pointer-events-none transition-opacity duration-100",
          colorsWithUses.length !== 0 && colorsGroups.length === 0
            ? "opacity-100"
            : "opacity-0"
        )}
      >
        <Icon.Check className="w-6 h-6" color="#989898" />
        <span className="text-gray-400 text-xs max-w-[140px] text-center">
          All the selected elements are normalized.
        </span>
      </div>

      <div ref={parent} className="gap-4 flex flex-col w-full">
        {colorsGroups?.map((group) => (
          <div
            key={group.to.id + "replace-group"}
            className="flex flex-row justify-start items-start gap-0 w-full"
          >
            <div className="flex flex-col w-full gap-2 min-w-[126px]">
              {group.from.map((f) => (
                <Color
                  color={f}
                  variables={variables}
                  options={{
                    timesSmall: true,
                  }}
                  key={f.id + "replace-group-color"}
                />
              ))}
            </div>
            <div className="flex flex-col w-fit gap-2">
              {group.from.map((e, index) => (
                <div
                  className="h-[34px] w-[16px] flex justify-start items-start relative"
                  key={e.id + "replace-group-arrows"}
                >
                  {index === 0 && (
                    <>
                      <div className="w-full h-px border-b border-gray-200/50 absolute top-[50%] left-0" />

                      {group.from.length > 1 && (
                        <div className="w-[50%] h-[50%] border-l border-t border-gray-200/50 rounded-tl-[8px] top-[50%] left-[50%] absolute -translate-x-px" />
                      )}
                    </>
                  )}

                  {index > 0 && (
                    <>
                      <div
                        className={cn(
                          "w-[50%] border-r border-gray-200/50 absolute",
                          index === 1
                            ? "h-[calc(8px)] top-[calc(-8px)]"
                            : "h-[calc(50%+8px+8px)] top-[calc(-50%-8px-8px)]"
                        )}
                      />

                      <div className="w-[50%] h-[50%] border-r border-b border-gray-200/50 rounded-br-[8px]" />
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full min-w-[126px]">
              <Color
                color={group.to}
                variables={variables}
                options={{
                  timesSmall: true,
                }}
              />
            </div>
          </div>
        ))}
        
        {textGroups?.map((group) => (
          <div
            key={group.to.id + "replace-group"}
            className="flex flex-row justify-start items-start gap-0 w-full"
          >
            {group.from.map((f) => (
              <Font text={f} />
            ))}
          </div>
        ))}
      </div>
    </ScrollablePageWrapper>
  );
}
