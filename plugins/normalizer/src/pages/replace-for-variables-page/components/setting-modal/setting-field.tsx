import { Label } from "@radix-ui/react-label";
import { Switch } from "../../../../components/ui/switch";
import { Slider } from "../../../../components/ui/slider";
import { Config } from "../..";

type FieldProps = {
  field: {
    type: "slider" | "switch";
    key: string;
    label: string;
    disabledIf?: (config: Config) => boolean;
    min?: number;
    max?: number;
  };
  config: Config;
  setConfig: (config: Config) => void;
};

export function SettingField({ field, config, setConfig }: FieldProps) {
  switch (field.type) {
    case "slider":
      return (
        <div className="flex flex-col gap-2" key={field.key + "slider"}>
          <Label className="text-sm text-gray-800 leading-none tracking-tight">
            {field.label}
          </Label>
          <div className="flex flex-col gap-1">
            <Slider
              name={field.key}
              defaultValue={[config[field.key]]}
              onValueChange={(value) =>
                setConfig({ ...config, [field.key]: value[0] })
              }
              className="w-full"
              min={field.min}
              max={field.max}
              disabled={field.disabledIf ? field.disabledIf(config) : false}
            />
            <div className="flex justify-between px-2">
              <span className="text-xs text-gray-500 text-left w-fit">
                {field.min}%
              </span>
              <span className="text-xs text-gray-500 text-right w-fit">
                {field.max}%
              </span>
            </div>
          </div>
        </div>
      );

    case "switch":
      return (
        <div className="flex flex-row items-center gap-2" key={field.key + "switch"}>
          <Switch
            checked={config[field.key]}
            onCheckedChange={(checked) =>
              setConfig({ ...config, [field.key]: checked })
            }
            disabled={field.disabledIf ? field.disabledIf(config) : false}
          />
          <Label className="text-sm text-gray-800 leading-none tracking-tight">
            {field.label}
          </Label>
        </div>
      );
  }
}
