import { useState } from "react";
import { Main } from "../main";
import { TooltipProvider } from "../ui/tooltip";
import { ReplaceGroup } from "../../types/colors";

export const Home = () => {
  const [colorsWithUses, setColorsWithUses] = useState([]);
  const [variables, setVariables] = useState([]);

  onmessage = async (event: MessageEvent) => {
    const pluginMessage = event.data.pluginMessage;

    if (pluginMessage.type === "selection-change") {
      const colorsWithUses = pluginMessage.colorsWithUses;
      const variables = pluginMessage.variables;
      setColorsWithUses(colorsWithUses || []);
      setVariables(variables || []);
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
        colorsWithUses={colorsWithUses}
        variables={variables}
        onColorReplace={handleColorReplace}
        onReplaceAll={handleReplaceAll}
      />
    </TooltipProvider>
  );
};
