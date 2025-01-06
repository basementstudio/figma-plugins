import { ColorWithUses } from "../../types/colors";
import { getColorKey } from "../../components/home/utils";
import Color from "../../components/ui/color";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ScrollablePageWrapper from "../scrollable-page-wrapper";
import EmptySelectionMessage from "../../components/empty-selection-message";

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

  return (
    <ScrollablePageWrapper title="Colors">
      <EmptySelectionMessage show={colorsWithUses?.length === 0} />
      <div
        ref={parent}
        className="w-full h-fit gap-2 flex flex-col justify-start items-center"
      >
        {colorsWithUses
          ?.sort((a, b) => {
            if (b.uses?.length !== a.uses?.length)
              return b.uses?.length - a.uses?.length;

            return b?.variable ? 1 : a?.variable ? -1 : 0;
          })
          .map((color) => (
            <div key={getColorKey(color) + "-container"} className="w-full">
              <DropdownMenu.Root key={getColorKey(color) + "-dropdown"}>
                <DropdownMenu.Trigger className="w-full outline-none">
                  <Color
                    key={getColorKey(color)}
                    color={color}
                    variables={variables}
                  />
                </DropdownMenu.Trigger>

                <DropdownMenu.Content
                  className="w-60 max-h-40 flex flex-col justify-start items-start gap-1 overflow-y-scroll bg-neutral-50 rounded-sm p-1 border border-neutral-200/50"
                  sideOffset={2}
                >
                  {colorsWithUses
                    .filter((c) => c.id !== color.id)
                    .map((colorReplacer) => (
                      <DropdownMenu.Item
                        key={getColorKey(colorReplacer) + "-item"}
                        className="w-full outline-none"
                        onClick={() => onColorReplace(color, colorReplacer)}
                      >
                        <Color
                          key={getColorKey(colorReplacer)}
                          color={colorReplacer}
                          variables={variables}
                        />
                      </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          ))}
      </div>
    </ScrollablePageWrapper>
  );
}
