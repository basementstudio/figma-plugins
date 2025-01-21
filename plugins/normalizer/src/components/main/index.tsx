import { ITEMS } from "./constants";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const SidebarItem = ({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) => {
  return (
    <Tooltip key={value}>
      <TooltipTrigger asChild>
        <div>
          <TabsTrigger
            className="w-fit h-fit flex justify-center items-center rounded-lg bg-transparent border border-gray-200/0 p-1 data-[state=active]:bg-gray-50 data-[state=active]:border-gray-200/50 transition-colors duration-100 hover:bg-gray-50 hover:border-gray-200/50"
            value={value}
          >
            <Icon className="w-5 h-5" />
          </TabsTrigger>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">
        <span>{label}</span>
      </TooltipContent>
    </Tooltip>
  );
};

export const Main = (props: any) => {
  return (
    <Tabs
      defaultValue={ITEMS[2].id}
      className="w-full h-full flex flex-row max-h-[600px]"
    >
      <div className="w-fit h-full bg-gray-100 border-r border-gray-200/50 max-h-[600px]">
        <div className="flex flex-col justify-start items-center gap-2 p-2">
          <TabsList className="flex flex-col gap-2 bg-transparent">
            {ITEMS.map((item) =>
              item.divider ? (
                <div className="w-full h-[1px] bg-gray-300 rounded" key={item.id} />
              ) : (
                <SidebarItem
                  icon={item.icon}
                  value={item.id}
                  key={item.id}
                  label={item.label}
                />
              )
            )}
          </TabsList>
        </div>
      </div>
      <div className="w-full h-full flex flex-col max-h-[600px] overflow-hidden">
        {ITEMS.map((item) => (
          <TabsContent
            key={item.id + "-page"}
            value={item.id}
            className="w-full h-full"
          >
            {item.component && typeof item.component === "function" ? (
              <item.component {...props} key={item.id} />
            ) : null}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
