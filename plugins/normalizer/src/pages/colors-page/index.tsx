import { ColorWithUses } from "../../types/colors";
import { getColorKey } from "../../components/home/utils";
import Color from "../../components/ui/color";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ScrollablePageWrapper from "../scrollable-page-wrapper";
import EmptySelectionMessage from "../../components/empty-selection-message";
import ReplaceDropdown from "../../components/replace-dropdown";
import { sortColorsByUsageAndVariables } from "../../utils/sorting";

export default function ColorsPage({
  colorsWithUses,
  variables,
  onColorReplace,
}: {
  colorsWithUses: ColorWithUses[];
  variables: Variable[];
  onColorReplace: (
    originalColor: ColorWithUses,
    newColor: ColorWithUses
  ) => void;
}) {
  const [parent] = useAutoAnimate({
    duration: 150,
    easing: "ease-in-out",
  });

  console.log("ColorsPage", { colorsWithUses });

  return (
    <ScrollablePageWrapper title="Colors">
      <EmptySelectionMessage show={colorsWithUses?.length === 0} />
      <div
        ref={parent}
        className="w-full h-fit gap-2 flex flex-col justify-start items-center"
      >
        {colorsWithUses?.sort(sortColorsByUsageAndVariables).map((color) => (
          <div key={getColorKey(color) + "-container"} className="w-full">
            <ReplaceDropdown
              rootKey={getColorKey(color)}
              title={`Replace color with:`}
              emptyMessage="No colors available"
              trigger={
                <Color
                  key={getColorKey(color)}
                  color={color}
                  variables={variables}
                />
              }
              items={colorsWithUses
                .filter((c) => c.id !== color.id)
                .map((colorReplacer) => ({
                  key: getColorKey(colorReplacer) + "-item",
                  component: (
                    <Color
                      key={getColorKey(colorReplacer)}
                      color={colorReplacer}
                      variables={variables}
                    />
                  ),
                  onClick: () => onColorReplace(color, colorReplacer),
                }))}
            />
          </div>
        ))}
      </div>
    </ScrollablePageWrapper>
  );
}
