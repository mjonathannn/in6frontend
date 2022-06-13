import { useState } from 'react';
import { ReactInputState } from 'types/reactInputState';

export const GenerateInputStates = (
  name: string,
  initialValue: string | number | File = '',
): ReactInputState => {
  const [mainValue, setMainValue] = useState(
    typeof initialValue === 'number' ? initialValue.toString() : initialValue,
  );
  const [errorMessage, setErrorMessage] = useState('');

  return {
    name,
    mainState: {
      value: mainValue,
      setFunction: setMainValue,
    },
    errorMessageState: {
      value: errorMessage,
      setFunction: setErrorMessage,
    },
  };
};
