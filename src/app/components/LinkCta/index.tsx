import * as React from 'react';

type LinkCtaProps = {
  value: SelectionCases;
  linked: boolean;
  settings: SettingsData;
};

export const LinkCta = ({ value, linked, settings }: LinkCtaProps) => {
  const [disabled, setDisabled] = React.useState(true);
  const [text, setText] = React.useState('Link');

  const handleOnCreate = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'initial-link',
          options: settings,
        },
      },
      '*'
    );
  };

  React.useEffect(() => {
    switch (value) {
      case 'text':
      case 'clone':
        if (!linked) {
          setDisabled(false);
        }
        break;
      default:
        setDisabled(true);
    }
    if (linked == true) {
      setText('Linked');
      setDisabled(linked);
    } else {
      setText('Link');
    }
  }, [value]);

  return (
    <button id="create" onClick={handleOnCreate} disabled={disabled}>
      {text}
    </button>
  );
};
