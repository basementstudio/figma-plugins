import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import WebFont from "webfontloader";
import ScrollablePageWrapper from "../scrollable-page-wrapper";
import EmptySelectionMessage from "../../components/empty-selection-message";
import { TextStyleWithUses } from "../../types/texts";
import Font from "../../components/ui/font";
import ReplaceDropdown from "../../components/replace-dropdown";

export default function FontsPage({
  // variables,
  textWithUses,
  onTextReplace,
}: {
  // variables: Variable[];
  textWithUses: TextStyleWithUses[];
  onTextReplace: (originalText: TextStyleWithUses, newText: TextStyleWithUses) => void;
}) {
  const [parent] = useAutoAnimate({
    duration: 150,
    easing: "ease-in-out",
  });

  useEffect(() => {
    if (textWithUses.length === 0) return;
    const uniqueFonts = [
      ...new Set(textWithUses.map((text) => text.fontName.family)),
    ];

    WebFont.load({
      google: {
        families: uniqueFonts,
      },
    });
  }, [textWithUses]);

  return (
    <ScrollablePageWrapper title="Fonts">
      <EmptySelectionMessage show={textWithUses?.length === 0} />
      <div
        ref={parent}
        className="w-full h-fit gap-2 flex flex-col justify-start items-center"
      >
        {textWithUses?.map((text) => (
          <div key={text.id + "-container"} className="w-full">
            <ReplaceDropdown
              title={`Replace font with:`}
              emptyMessage={`No fonts available to replace.`}
              trigger={<Font key={text.id} text={text} />}
              items={textWithUses
                .filter((t) => t.id !== text.id)
                .map((fontReplacer) => ({
                  key: fontReplacer.id + "-item",
                  component: <Font key={fontReplacer.id} text={fontReplacer} />,
                  onClick: () => onTextReplace(text, fontReplacer),
                }))}
            />
          </div>
        ))}
      </div>
    </ScrollablePageWrapper>
  );
}
