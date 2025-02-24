import { TextStyleWithUses } from "../../../types/texts";
import { cn } from "../../../utils/cn";
import UsesTag from "../uses-tag";

export default function Font({
  text,
  options,
}: {
  text: TextStyleWithUses;
  options: {
    timesSmall: boolean;
    hideDetails: boolean;
  };
}) {
  return (
    <div
      key={text.id}
      className={cn(
        "flex flex-row justify-start items-center p-2 gap-2 rounded-lg w-full transition-colors bg-gray-100 border border-gray-200/50",
        "cursor-pointer hover:bg-gray-200"
      )}
    >
      <div
        className="h-6 min-w-6 w-6 rounded border border-gray-200/50 bg-gray-50 flex flex-row justify-center items-center overflow-hidden leading-none text-sm text-gray-800 text-left"
        style={{
          fontFamily: `${text.fontName.family}, Geist, sans-serif`,
          fontWeight: text.fontName.style === "Bold" ? "bold" : "normal",
        }}
      >
        Aa
      </div>
      <span className="text-xs leading-none text-gray-950 text-ellipsis max-w-full overflow-hidden max-h-3 w-full text-left whitespace-nowrap">
        {text.fontName.family} - {text.fontName.style}
      </span>
      {!options?.hideDetails && (
        <span className="text-xs leading-none text-gray-500">
          {(Number.isInteger(text.fontSize)
            ? text.fontSize
            : text.fontSize.toFixed(2)) + "px"}
        </span>
      )}
      <UsesTag uses={text.uses.length} timesSmall={options?.timesSmall} />
    </div>
  );
}
