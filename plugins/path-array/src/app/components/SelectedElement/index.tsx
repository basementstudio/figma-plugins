import * as React from 'react';
import { ALL_SELECTION_CASES } from '../../../utils/constants';

type SelectedElementProps = {
  value: SelectionCases;
};

export const SelectedElement = ({ value }: SelectedElementProps) => {
  switch (value) {
    default:
      return (
        <div>
          <span>{ALL_SELECTION_CASES[value]}</span>
        </div>
      );
  }
};
