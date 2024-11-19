import * as React from 'react';

type InputProps = {
  id: SettingsKeys;
  handleSettings: (id: SettingsKeys, value: any) => void;
  children: React.ReactNode;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = ({ id, handleSettings, children, ...rest }: InputProps) => {
  // const [internalValue, setInternalValue] = React.useState(rest.value);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     target: { name, value },
  //   } = e;
  //   // let _test = { ...props.values, [name]: Number(value) };

  //   // switch (name) {
  //   //   case 'offset':
  //   //     if (value < 0) _test = { ...props.values, [name]: 0 };
  //   //     break;
  //   //   case 'horizontalAlign':
  //   //   case 'verticalAlign':
  //   //     // limit input to min 0 and max 1
  //   //     if (value < 0) _test = { ...props.values, [name]: 0 };
  //   //     if (value > 1) _test = { ...props.values, [name]: 1 };
  //   //     break;
  //   //   case 'count':
  //   //     // limit input to positive integers only
  //   //     if (value < 0) _test = { ...props.values, [name]: 0 };
  //   //     else _test = { ...props.values, [name]: Math.round(value) };

  //   //     if (props.values.totalLength != 0 && props.values.autoWidth) {
  //   //       const space = _test.isLoop
  //   //         ? _test.totalLength / _test.count - _test.objWidth
  //   //         : _test.totalLength / (_test.count - 1) - _test.objWidth;
  //   //       _test = { ..._test, spacing: space };
  //   //     }
  //   //     break;
  //   //   default:
  //   //     break;
  //   // }

  //   // props.setvalues(_test);
  // };

  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        // not that great but its good enough.
        // value={Math.round(rest.value * 100) / 100}
        onChange={(e) => handleSettings(id, e.target.value)}
        {...rest}
      />
    </div>
  );
};
