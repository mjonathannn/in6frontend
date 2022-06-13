import { yupRequiredStringField } from 'utils/validation';
import * as yup from 'yup';
import { SkillsStepData } from '.';

export const validateSkillsData = async (
  skillsData: SkillsStepData,
): Promise<void> => {
  const schema = yup.object().shape({
    skills: yup
      .array(
        yup.object().shape({
          name: yupRequiredStringField,
          description: yup.string().optional(),
        }),
      )
      .optional(),
  });

  await schema.validate(skillsData, { abortEarly: false });
};
