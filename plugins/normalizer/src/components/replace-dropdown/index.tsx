import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";

interface DropdownMenuItem {
  key: string;
  component: ReactNode;
  onClick?: () => void;
}

interface ReplaceDropdownProps {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  title?: string;
  emptyMessage?: string;
  rootKey?: string;
}

export default function ReplaceDropdown({
  trigger,
  items,
  title = "Replace for:",
  emptyMessage = "No items available",
  rootKey,
}: ReplaceDropdownProps) {
  return (
    <DropdownMenu.Root key={rootKey}>
      <DropdownMenu.Trigger className="w-full outline-none">
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="w-60 max-h-40 flex flex-col justify-start items-start gap-1 overflow-y-scroll bg-neutral-50 rounded-sm p-1 border border-neutral-200/50 shadow-md shadow-gray-200/50 
        data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        sideOffset={2}
      >
        <div className="w-full px-2 mt-2 pb-1 text-sm text-neutral-500">
          <span className="text-xs leading-none text-gray-500">{title}</span>
        </div>
        {items.length === 0 ? (
          <div className="w-full p-2">
            <span className="text-xs leading-none text-gray-400 text-center">
              {emptyMessage}
            </span>
          </div>
        ) : (
          items.map(({ key, component, onClick }) => (
            <DropdownMenu.Item
              key={key}
              className="w-full outline-none"
              onClick={onClick}
            >
              {component}
            </DropdownMenu.Item>
          ))
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
