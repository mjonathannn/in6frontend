import {
  VacancyDefinitionStep,
  VacancyDefinitionStepData,
  validateVacancyDefinitionData,
} from './VacancyDefinitionStep';
import { WorkloadStep, WorkloadStepData } from './WorkloadStep';
import { RemunerationStep, RemunerationStepData } from './RemunerationStep';
import { CompetenciesStep, CompetenciesStepData } from './CompetenciesStep';
import { SkillsStep, SkillsStepData } from './SkillsStep';
import { LanguagesStep, LanguagesStepData } from './LanguagesStep';
import {
  CertificationsStep,
  CertificationsStepData,
} from './CertificationsStep';
import {
  OtherRequirementsStep,
  OtherRequirementsStepData,
} from './OtherRequirementsStep';
import { FinishStep } from './FinishStep';
import { validateWorkloadData } from './WorkloadStep/validateWorkloadData';
import { validateRemunerationData } from './RemunerationStep/validateRemunerationData';
import { validateCompetenciesData } from './CompetenciesStep/validateCompetenciesData';
import { validateSkillsData } from './SkillsStep/validateSkillsData';
import { validateLanguagesData } from './LanguagesStep/validateLanguagesData';
import { validateCertificationsData } from './CertificationsStep/validateCertificationsData';
import { validateOtherRequirementsData } from './OtherRequirementsStep/validateOtherRequirementsData';

export {
  VacancyDefinitionStep,
  validateVacancyDefinitionData,
  WorkloadStep,
  validateWorkloadData,
  RemunerationStep,
  validateRemunerationData,
  CompetenciesStep,
  validateCompetenciesData,
  SkillsStep,
  validateSkillsData,
  LanguagesStep,
  validateLanguagesData,
  CertificationsStep,
  validateCertificationsData,
  OtherRequirementsStep,
  validateOtherRequirementsData,
  FinishStep,
};

export type {
  CertificationsStepData,
  CompetenciesStepData,
  LanguagesStepData,
  OtherRequirementsStepData,
  RemunerationStepData,
  SkillsStepData,
  VacancyDefinitionStepData,
  WorkloadStepData,
};

export interface AllStepsData {
  vacancyDefinitionStep: VacancyDefinitionStepData;
  workloadStep: WorkloadStepData;
  remunerationStep: RemunerationStepData;
  competenciesStep: CompetenciesStepData;
  skillsStep: SkillsStepData;
  languagesStep: LanguagesStepData;
  certificationsStep: CertificationsStepData;
  otherRequirementsStep: OtherRequirementsStepData;
  finishStep?: null;
}

export type AllStepsDataKeyType = keyof AllStepsData;
export type InitialDataType = VacancyDefinitionStepData &
  WorkloadStepData &
  RemunerationStepData &
  CompetenciesStepData &
  SkillsStepData &
  LanguagesStepData &
  CertificationsStepData &
  OtherRequirementsStepData &
  AllStepsData;

export type UpdateDataType =
  | VacancyDefinitionStepData
  | WorkloadStepData
  | RemunerationStepData
  | CompetenciesStepData
  | SkillsStepData
  | LanguagesStepData
  | CertificationsStepData
  | OtherRequirementsStepData
  | AllStepsData;
