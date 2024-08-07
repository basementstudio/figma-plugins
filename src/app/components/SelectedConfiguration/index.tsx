import * as React from 'react';
import { Onboarding } from './onboarding';
import { Text } from './text';
import { Clone } from './clone';

type SelectedConfigurationProps = {
  value: SelectionCases;
  settings: SettingsData;
  handleSettings: (value: SettingsData) => void;
};

export const SelectedConfiguration = ({ value, settings, handleSettings }: SelectedConfigurationProps) => {
  const handleOnOffFocus = (e) => {
    let copy;

    if (e.target.value === '') {
      copy = { ...settings, [e.target.name]: settings[e.target.name] };
    } else {
      copy = { ...settings, [e.target.name]: Number(e.target.value) };
    }

    handleSettings(copy);
  };

  const handleOnOffset = (align: OffsetAlign = 'right') => {
    if (!settings.autoWidth) {
      let copy: SettingsData = { ...settings };
      const count = copy.isLoop ? copy.count - 1 : copy.count;
      let length = 0;

      if (value == 'text') {
        length = settings.objWidth;
      } else {
        length = count * copy.objWidth + copy.spacing * (count - 1);
      }

      switch (align) {
        case 'left':
          copy.offset = 0;
          break;
        case 'center':
          copy.offset = copy.totalLength / 2 - length / 2 + (value == 'clone' ? copy.objWidth / 2 : 0);
          break;
        case 'right':
          copy.offset = copy.totalLength - length + (value == 'clone' ? copy.objWidth / 2 : 0);
          break;
      }

      if (copy.offset < 0) {
        copy.offset = 0;
      }

      handleSettings(copy);
    }
  };

  switch (value) {
    case 'one':
    case 'toomany':
    case 'nocurve':
    case 'nothing':
      return <Onboarding />;
    case 'linklost':
      return (
        <div>
          <div>Error trying to find linked object. try selecting a different group or re-linking</div>
        </div>
      );
    case 'text':
      return (
        <Text
          settings={settings}
          handleOnOffFocus={handleOnOffFocus}
          handleSettings={handleSettings}
          handleOnOffset={handleOnOffset}
        />
      );
    case 'clone':
      return (
        <Clone
          settings={settings}
          handleOnOffFocus={handleOnOffFocus}
          handleSettings={handleSettings}
          handleOnOffset={handleOnOffset}
        />
      );
    default:
      return <div className=""></div>;
  }
};
