import { useState } from "react";
import { Main } from "../main";
import { TooltipProvider } from "../ui/tooltip";
import { ReplaceGroup } from "../../types/colors";

export const Home = () => {
  const [props, setProps] = useState({});

  onmessage = async (event: MessageEvent) => {
    const pluginMessage = event.data.pluginMessage;
    const { type, ...rest } = pluginMessage;

    if (type === "selection-change") {
      setProps({ ...rest });
    }
  };

  const handleColorReplace = (originalColor: any, newColor: any) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "replace-color",
          originalColor,
          newColor,
        },
      },
      "*"
    );
  };

  const handleTextReplace = (originalFont: any, newFont: any) => {
    console.log("handleTextReplace", originalFont, newFont);

    parent.postMessage(
      {
        pluginMessage: {
          type: "replace-text",
          originalFont,
          newFont,
        },
      },
      "*"
    );
  };

  const handleReplaceAll = (colorsGroups: ReplaceGroup[]) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "replace-all",
          colorsGroups,
        },
      },
      "*"
    );
  };

  return (
    <TooltipProvider>
      <Main
        {...props}
        onColorReplace={handleColorReplace}
        onTextReplace={handleTextReplace}
        onReplaceAll={handleReplaceAll}
      />
    </TooltipProvider>
  );
};
