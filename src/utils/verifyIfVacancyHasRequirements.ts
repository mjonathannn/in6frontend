import { IVacancyLanguage } from 'types/vacancy/IVacancyLanguage';
import { IVacancySkill } from 'types/vacancy/IVacancySkill';

interface RequirementsType {
  competencies?: string[];
  skills?: IVacancySkill[];
  languages?: IVacancyLanguage[];
  certifications?: string[];
  otherRequirements?: string;
}

export const verifyIfVacancyHasRequirements = ({
  otherRequirements,
  competencies,
  skills,
  languages,
  certifications,
}: RequirementsType): boolean =>
  !!otherRequirements ||
  !!competencies ||
  !!skills ||
  !!languages ||
  !!certifications;
