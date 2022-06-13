import * as yup from 'yup';
import {
  yupRequiredNumberField,
  yupRequiredStringField,
} from 'utils/validation';
import { RemunerationStepData } from '.';

export const validateRemunerationData = async (
  remunerationData: RemunerationStepData,
): Promise<void> => {
  const schema = yup.object().shape({
    salary: yup
      .string()
      .nullable(true)
      .when('salaryToNegotiate', {
        is: false,
        then: yupRequiredStringField.notOneOf(
          ['0', '0,0', '0,00'],
          'O salário base não pode ser nulo',
        ),
      }),
    typeOfPay: yupRequiredNumberField,
    salaryToNegotiate: yup.boolean(),
    benefits: yup.string().optional(),
  });

  await schema.validate(remunerationData, { abortEarly: false });
};
