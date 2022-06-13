import * as yup from 'yup';
import { yupRequiredStringField } from 'utils/validation';
import { LanguagesStepData } from '.';

export const validateLanguagesData = async (
  languagesData: LanguagesStepData,
): Promise<void> => {
  const schema = yup.object().shape({
    languages: yup
      .array(
        yup.object().shape({
          name: yupRequiredStringField,
          level: yupRequiredStringField,
        }),
      )
      .optional(),
  });

  await schema.validate(languagesData, { abortEarly: false });
};
