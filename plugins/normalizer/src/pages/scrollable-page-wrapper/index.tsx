import { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/cn";

export default function ScrollablePageWrapper({
  children,
  title,
  rightComponent,
  bottomComponent,
}: {
  children: React.ReactNode;
  title: string;
  rightComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
}) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrollable = scrollHeight > clientHeight;

      if (!isScrollable) {
        setIsAtTop(true);
        setIsAtBottom(true);
        return;
      }

      setIsAtTop(scrollTop === 0);
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
    };

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="max-h-[600px] w-full h-full flex flex-col justify-start items-start p-2 gap-1 bg-gray-50 ">
        <div className="flex flex-row items-center w-full min-h-[30px] h-fit">
          <h1 className="font-semibold text-gray-950 text-sm tracking-tight px-2 min-w-fit">
            {title}
          </h1>
          {rightComponent}
        </div>

        <div className="w-full h-full max-h-full relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex flex-col justify-start items-start gap-2 w-full h-full overflow-y-scroll max-h-full relative"
          >
            {children}
          </div>

          <div
            className={cn(
              "absolute top--[38px] top-0 left-0 w-full h-[30px] bg-gradient-to-b from-gray-50 to-transparent transition-all duration-100 pointer-events-none",
              isAtTop ? "opacity-0" : "opacity-100"
            )}
            key="top-gradient"
          />

          <div
            className={cn(
              "absolute bottom--[8px] bottom-0 left-0 w-full h-[30px] bg-gradient-to-t from-gray-50 to-transparent transition-all duration-100 pointer-events-none",
              isAtBottom ? "opacity-0" : "opacity-100"
            )}
            key="bottom-gradient"
          />
        </div>
        
        {bottomComponent}
      </div>
    </>
  );
}
