import * as React from 'react';

type CheckboxProps = {
  id: SettingsKeys;
  handleSettings: (id: SettingsKeys, value: boolean) => void;
  children: React.ReactNode;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Checkbox = ({ id, value, handleSettings, children, ...rest }: CheckboxProps) => {
  const handleOnChange = () => {
    handleSettings(id, !rest.checked);
  };

  return (
    <div>
      <input type="checkbox" id={id} onChange={handleOnChange} {...rest} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};
