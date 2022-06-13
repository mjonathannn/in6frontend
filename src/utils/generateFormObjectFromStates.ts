import { ReactInputState } from 'types/reactInputState';

interface GenericObject {
  [key: string]: string | File;
}

export const generateFormObjectFromStates = (
  states: ReactInputState[],
): GenericObject => {
  const dataObject: GenericObject = {};

  states.forEach(({ name, mainState: { value } }) => {
    dataObject[name] = value;
  });

  return dataObject;
};
