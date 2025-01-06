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
  className?: string;
  title?: string;
  emptyMessage?: string;
}

export default function ReplaceDropdown({
  trigger,
  items,
  className = "w-60 max-h-40 flex flex-col justify-start items-start gap-1 overflow-y-scroll bg-neutral-50 rounded-sm p-1 border border-neutral-200/50",
  title = "Replace for:",
  emptyMessage = "No items available",
}: ReplaceDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="w-full outline-none">
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className={className} sideOffset={2}>
        <div className="w-full px-2 mt-2 pb-1 text-sm text-neutral-500">
          <span className="text-xs leading-none text-gray-500">
            {title}
          </span>
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