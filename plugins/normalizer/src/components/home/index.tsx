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
        onReplaceAll={handleReplaceAll}
      />
    </TooltipProvider>
  );
};
