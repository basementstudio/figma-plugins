import Icon from "../../../../components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";

import { Config } from "../..";
import { FIELDS } from "./constants";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SettingField } from "./setting-field";

export function SettingSection({
  field,
  config,
  setConfig,
}: {
  field: any;
  config: Config;
  setConfig: (config: Config) => void;
}) {
  const [parent] = useAutoAnimate({
    duration: 150,
  });

  return (
    <div className="flex flex-col gap-3" ref={parent} key={field.sectionTitle + "section"}>
      <h2 className="text-sm font-semibold leading-none tracking-tight" key={field.sectionTitle}>
        {field.sectionTitle}
      </h2>

      {field.fields.map((fieldItem) => {
        if (fieldItem.showIf && !fieldItem.showIf(config)) return null;

        return (
          <SettingField
            key={fieldItem.key}
            field={fieldItem}
            config={config}
            setConfig={setConfig}
          />
        );
      })}
    </div>
  );
}

export default function SettingModal({
  config,
  setConfig,
}: {
  config: Config;
  setConfig: (config: Config) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="w-fit flex flex-row items-center gap-1 text-[10px] bg-gray-100 p-1 rounded-md border border-gray-200/50 hover:bg-gray-200 transition-all duration-100">
          <Icon.Settings className="w-4 h-4" color="#292929" />
        </button>
      </DialogTrigger>

      <DialogContent className="gap-4">
        {FIELDS.map((field) => (
          <SettingSection field={field} config={config} setConfig={setConfig} />
        ))}
      </DialogContent>
    </Dialog>
  );
}
