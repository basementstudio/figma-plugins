import * as React from 'react';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';

let lastspacing = 10;

type CloneProps = {
  settings: SettingsData;
  handleSettings: (value: SettingsData) => void;
  handleOnOffFocus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnOffset: (align: OffsetAlign) => void;
};

export const Clone = ({ settings, handleSettings, handleOnOffFocus, handleOnOffset }: CloneProps) => {
  return (
    <div>
      <div>
        <div>
          <Input
            value={settings['count']}
            name="count"
            id="count"
            onBlur={(e) => handleOnOffFocus(e)}
            handleSettings={(id, value) => handleSettings({ ...settings, [id]: value })}
          >
            Count:
          </Input>
        </div>
        <div>
          <div>
            <Input
              value={settings['spacing']}
              name="spacing"
              id="spacing"
              onBlur={(e) => handleOnOffFocus(e)}
              handleSettings={(id, value) => handleSettings({ ...settings, [id]: value })}
              disabled={settings.autoWidth}
            >
              Spacing(px)
            </Input>
            <div
              className={
                settings.autoWidth
                  ? 'icon icon--link-connected icon--button icon--selected a'
                  : 'icon icon--link-broken icon--button a'
              }
              onClick={() => {
                // clean up later. now it just needs to work lmao
                let copy: SettingsData = { ...settings };
                copy = { ...copy, autoWidth: !copy.autoWidth };

                if (copy.autoWidth) {
                  lastspacing = copy.spacing;
                  const space = copy.isLoop
                    ? copy.totalLength / copy.count - copy.objWidth
                    : copy.totalLength / (copy.count - 1) - copy.objWidth;
                  copy = { ...copy, spacing: space, offset: 0 };
                } else {
                  copy = { ...copy, spacing: lastspacing };
                }
                handleSettings(copy);
              }}
            ></div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex">
          <Input
            value={settings['offset']}
            id="offset"
            name="offset"
            onBlur={(e) => handleOnOffFocus(e)}
            handleSettings={(id, value) => handleSettings({ ...settings, [id]: value })}
            disabled={settings.autoWidth}
          >
            Offset (px)
          </Input>
          <div className="flex">
            <div onClick={() => handleOnOffset('left')}></div>
            <div onClick={() => handleOnOffset('center')}></div>
            <div onClick={() => handleOnOffset('right')}></div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Input
            value={settings['verticalAlign']}
            id="verticalAlign"
            name="verticalAlign"
            onBlur={(e) => handleOnOffFocus(e)}
            min={0}
            max={1}
            step={0.1}
            handleSettings={(id, value) => handleSettings({ ...settings, [id]: value })}
          >
            Vertical Align
          </Input>
        </div>
        <div>
          <Input
            value={settings['horizontalAlign']}
            id="horizontalAlign"
            name="horizontalAlign"
            onBlur={(e) => handleOnOffFocus(e)}
            min={0}
            max={1}
            step={0.1}
            handleSettings={(id, value) => handleSettings({ ...settings, [id]: value })}
          >
            Horizontal Align
          </Input>
        </div>
      </div>

      <div>
        <div>Rotation:</div>

        <Checkbox
          id="rotCheck"
          checked={Boolean(settings['rotCheck'])}
          handleSettings={(id, value) => handleSettings({ ...settings, [id]: value })}
        >
          characters follow curve rotation
        </Checkbox>

        <Checkbox
          id="reverse"
          checked={Boolean(settings['reverse'])}
          handleSettings={(id, value) => handleSettings({ ...settings, [id]: value })}
        >
          reverse direction of text
        </Checkbox>
      </div>
    </div>
  );
};
