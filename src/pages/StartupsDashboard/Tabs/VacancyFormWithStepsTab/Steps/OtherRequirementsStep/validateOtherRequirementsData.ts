import * as yup from 'yup';
import { OtherRequirementsStepData } from '.';

export const validateOtherRequirementsData = async (
  otherRequirementsData: OtherRequirementsStepData,
): Promise<void> => {
  const schema = yup.object().shape({
    otherRequirements: yup.string().matches(/.{300,}/, {
      excludeEmptyString: true,
      message: 'Mínimo de 300 caracteres',
    }),
  });

  await schema.validate(otherRequirementsData, { abortEarly: false });
};
