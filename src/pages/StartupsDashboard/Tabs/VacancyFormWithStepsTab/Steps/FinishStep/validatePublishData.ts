import * as yup from 'yup';
import { yupRequiredStringField } from 'utils/validation';
import { AllStepsData } from '..';

export const validatePublishData = async (
  publishData: AllStepsData,
): Promise<void> => {
  const schema = yup.object().shape({
    prop: yupRequiredStringField,
  });

  await schema.validate(publishData, { abortEarly: false });
};
