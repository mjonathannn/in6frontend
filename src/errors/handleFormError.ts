import { ReactInputState } from 'types/reactInputState';
import { generateStatesObjectFromStatesArray } from 'utils';
import { ValidationError } from 'yup';
import { getValidationErrors } from './getValidationErrors';

export const handleFormError = (
  error: Error | ValidationError,
  formStates: ReactInputState[],
): void => {
  if (error instanceof ValidationError) {
    const errors = getValidationErrors(error);
    const statesObject = generateStatesObjectFromStatesArray(formStates);

    Object.keys(errors).forEach(key => {
      statesObject[key].errorMessageState.setFunction(errors[key]);
    });
  } else alert('Problema inesperado!');
};
