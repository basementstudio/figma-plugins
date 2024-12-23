import cn from "classnames";
import { rgbToHex } from "../../../utils/colors";
import { ColorWithUses } from "../../../types/colors";
import UsesTag from "../uses-tag";

const getColorName = (color: ColorWithUses, variables: Variable[]) => {
  const variable = variables.find((v) => v.id === color.variable?.id);
  return variable?.name || rgbToHex({ r: color.r, g: color.g, b: color.b });
};

const isVariable = (color: ColorWithUses, variables: Variable[]) => {
  return !variables.find((v) => v.id === color.variable?.id)?.name;
};

export default function Color({
  color,
  variables,
  options = {
    timesSmall: false,
    clickable: true,
  },
}: {
  color: ColorWithUses;
  variables: Variable[];
  options?: {
    timesSmall?: boolean;
    clickable?: boolean;
  };
}) {
  return (
    <div
      className={cn(
        "flex flex-row justify-start items-center p-2 gap-2 rounded-lg w-full transition-colors bg-gray-100 border border-gray-200/50",
        options.clickable && "cursor-pointer hover:bg-gray-200"
      )}
    >
      <div className="w-full flex flex-row justify-start items-center gap-2 max-w-full text-ellipsis overflow-hidden">
        <div
          className="h-4 min-w-4 w-4 rounded-full border border-gray-200/50"
          style={{
            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
          }}
        />
        <h3
          className={cn(
            "text-xs leading-none font-medium text-gray-950 tracking-tight max-w-full text-ellipsis overflow-hidden",
            isVariable(color, variables) && "uppercase"
          )}
        >
          {getColorName(color, variables)}
        </h3>
      </div>

      {color?.uses?.length > 0 && (
        <UsesTag uses={color.uses.length} timesSmall={options.timesSmall} />
      )}
    </div>
  );
}
