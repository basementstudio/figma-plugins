import { createRoot } from 'react-dom/client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import './styles/main.scss';

import { SelectedElement } from './components/SelectedElement';
import { SelectedConfiguration } from './components/SelectedConfiguration';
import { SETTINGS_DEFAULT } from '../utils/constants';
import { LinkCta } from './components/LinkCta';
import { BackCta } from './components/BackCta';

const App = () => {
  const [selection, setSelection] = useState<SelectionCases>('nothing');
  const [settings, setSettings] = useState<SettingsData>(SETTINGS_DEFAULT);
  const [link, setLink] = useState<boolean>(false);

  useEffect(() => {
    if (link) {
      parent.postMessage(
        {
          pluginMessage: {
            type: 'do-the-thing',
            options: settings,
          },
        },
        '*'
      );
    }
  }, [settings]);

  onmessage = (event) => {
    let eventData = event.data.pluginMessage;

    switch (eventData.type) {
      case 'svg':
      case 'selection':
        const svgdata = event.data.pluginMessage.svgdata;
        let copy: SettingsData;

        if (eventData.data.setting != null) {
          copy = { ...eventData.data.setting };
        } else {
          copy = { ...settings };
        }

        if (svgdata !== null && svgdata !== undefined && svgdata !== '') {
          const width = event.data.pluginMessage.width;
          let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', svgdata);
          const isLoop: boolean = svgdata.toUpperCase().includes('Z');
          const svglength = path.getTotalLength();

          // change the spacing number on "auto width" setting (space evenly thru whole thing)
          if (svglength != 0 && settings.autoWidth) {
            const space = isLoop ? svglength / settings.count - width : svglength / (settings.count - 1) - width;

            copy = { ...copy, spacing: space };
          }

          copy = {
            ...copy,
            totalLength: svglength,
            isLoop: isLoop,
            objWidth: width,
          };
        }

        if (eventData.data.setting != null) {
          setLink(true);
        }

        if (eventData.value === 'text') {
          copy = { ...copy, autoWidth: false };
        }

        setSettings({ ...copy });

        if (eventData.data.type === 'text') {
          setSelection('text');
        } else {
          setSelection('clone');
        }
        break;

      default:
        setSelection(eventData.value);
        setLink(false);

        break;
    }
  };

  return (
    <div>
      <div>
        <SelectedElement value={selection} />

        <hr />

        <SelectedConfiguration value={selection} settings={settings} handleSettings={(value) => setSettings(value)} />
      </div>

      <div>
        <hr />
        <div>
          <BackCta />

          <LinkCta value={selection} linked={link} settings={settings} />
        </div>
      </div>
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('react-page');
  const root = createRoot(container);

  root.render(<App />);
});
