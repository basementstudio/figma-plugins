import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import WebFont from "webfontloader";
import ScrollablePageWrapper from "../scrollable-page-wrapper";
import EmptySelectionMessage from "../../components/empty-selection-message";
import { TextStyleWithUses } from "../../types/texts";
import Font from "../../components/ui/font";

export default function FontsPage({
  variables,
  textWithUses,
}: {
  variables: Variable[];
  textWithUses: TextStyleWithUses[];
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
      <EmptySelectionMessage show={false} />
      <div
        ref={parent}
        className="w-full h-fit gap-2 flex flex-col justify-start items-center"
      >
        {textWithUses.map((text) => (
          <Font key={text.id} text={text} />
        ))}
      </div>
    </ScrollablePageWrapper>
  );
}
