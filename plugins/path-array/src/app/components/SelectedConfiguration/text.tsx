import * as React from 'react';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';

type TextProps = {
  settings: SettingsData;
  handleSettings: (value: SettingsData) => void;
  handleOnOffFocus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnOffset: (align: OffsetAlign) => void;
};

export const Text = ({ settings, handleSettings, handleOnOffset }: TextProps) => {
  return (
    <div>
      <div>
        <p>Preview</p>
        <div className="preview-box" id="preview-box">
          <svg>
            <path d="M 0 97 C 11.027847809127614 -78.67636560967614 85.2616024017334 23.801519199593187 121 97" />
          </svg>
        </div>
        <div>
          <Input
            value={settings['textSize']}
            id="textSize"
            name="textSize"
            // onBlur={(e) => handleOnOffFocus(e)}
            handleSettings={(id, value) => handleSettings({ ...settings, [id]: parseInt(value) })}
            step={1}
            min={0}
            type="number"
          >
            Text size (px)
          </Input>
        </div>
        <div>
          <Input
            value={settings['textWeight']}
            id="textWeight"
            name="textWeight"
            // onBlur={(e) => handleOnOffFocus(e)}
            handleSettings={(id, value) => handleSettings({ ...settings, [id]: value })}
            type="text"
          >
            Text weight
          </Input>
        </div>
        <div>
          <Input
            value={settings['verticalAlign']}
            id="verticalAlign"
            name="verticalAlign"
            // onBlur={(e) => handleOnOffFocus(e)}
            min={0}
            max={1}
            step={0.1}
            handleSettings={(id, value) => handleSettings({ ...settings, [id]: parseInt(value) })}
            type="number"
          >
            Vertical Align
          </Input>
        </div>
        <div>
          <Input
            value={settings['horizontalAlign']}
            id="horizontalAlign"
            name="horizontalAlign"
            // onBlur={(e) => handleOnOffFocus(e)}
            min={0}
            max={1}
            step={0.1}
            handleSettings={(id, value) => handleSettings({ ...settings, [id]: parseInt(value) })}
            type="number"
          >
            Horizontal Align
          </Input>
        </div>
      </div>

      <div>
        <div>
          <Input
            value={settings['offset']}
            id="offset"
            name="offset"
            min={0}
            step={1}
            // max={1}
            // onBlur={(e) => handleOnOffFocus(e)}
            handleSettings={(id, value) => handleSettings({ ...settings, [id]: parseInt(value) })}
            disabled={settings.autoWidth}
            type="number"
          >
            Offset(px)
          </Input>
          <div>
            <div
              className={
                settings.autoWidth
                  ? 'icon icon--layout-align-left icon--black-3'
                  : 'icon icon--layout-align-left icon--button'
              }
              onClick={() => handleOnOffset('left')}
            >
              Align to left
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="21" x2="3" y1="6" y2="6" />
                <line x1="15" x2="3" y1="12" y2="12" />
                <line x1="17" x2="3" y1="18" y2="18" />
              </svg>
            </div>
            <div
              className={
                settings.autoWidth
                  ? 'icon icon--layout-align-horiz-cent icon--black-3'
                  : 'icon icon--layout-align-horiz-cent icon--button'
              }
              onClick={() => handleOnOffset('center')}
            >
              Align to center
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="21" x2="3" y1="6" y2="6" />
                <line x1="17" x2="7" y1="12" y2="12" />
                <line x1="19" x2="5" y1="18" y2="18" />
              </svg>
            </div>
            <div
              className={
                settings.autoWidth
                  ? 'icon icon--layout-align-right icon--black-3'
                  : 'icon icon--layout-align-right icon--button'
              }
              onClick={() => handleOnOffset('right')}
            >
              Align to right
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="21" x2="3" y1="6" y2="6" />
                <line x1="21" x2="9" y1="12" y2="12" />
                <line x1="21" x2="7" y1="18" y2="18" />
              </svg>
            </div>
          </div>
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
