import * as yup from 'yup';
import {
  yupRequiredStringField,
  yupRequiredNumberField,
} from 'utils/validation';

import { VacancyDefinitionStepData } from '.';

export const validateVacancyDefinitionData = async (
  vacancyDefinitionData: VacancyDefinitionStepData,
): Promise<void> => {
  const schema = yup.object().shape({
    name: yupRequiredStringField,
    typeJob: yupRequiredNumberField,
    state: yupRequiredNumberField,
    city: yupRequiredNumberField,
    description: yupRequiredStringField.min(300, 'Mínimo de 300 caracteres'),
  });

  await schema.validate(vacancyDefinitionData, { abortEarly: false });
};
