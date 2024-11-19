import { cn } from "../../utils/cn";
import EmptyIlustration from "./components/empty-ilustration";

export default function EmptySelectionMessage({ show }: { show: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center w-full h-full gap-2 pb-20 absolute top-0 left-0 pointer-events-none transition-opacity duration-100",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <EmptyIlustration className="translate-x-[2px]" />
      <span className="text-gray-400 text-xs max-w-[100px] text-center">
        Start by selecting some elements.
      </span>
    </div>
  );
}
