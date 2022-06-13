import * as yup from 'yup';
import { CompetenciesStepData } from '.';

export const validateCompetenciesData = async (
  competenciesData: CompetenciesStepData,
): Promise<void> => {
  const schema = yup.object().shape({
    competencies: yup.array(yup.string()).optional(),
  });

  await schema.validate(competenciesData, { abortEarly: false });
};
