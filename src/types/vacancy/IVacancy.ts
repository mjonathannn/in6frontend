import { ICompanyDTOOutput } from 'types/company/ICompanyDTOOutput';
import { IBusinessSector } from '../IBusinessSector';
import { ICity } from '../city/ICity';
import { ITypeDTO } from '../ITypeDTO';
import { IVacancyStatus } from './IVacancyStatus';
import { IVacancySkill } from './IVacancySkill';
import { IVacancyLanguage } from './IVacancyLanguage';

interface ICompanyDTOInput {
  id: number;
  cityDTO: ICity;
  businessSectorDTO: IBusinessSector;
}

export interface IVacancy {
  id: number;
  name: string;
  description: string;
  typeJobDTO: ITypeDTO;
  typeOfPayDTO: ITypeDTO;
  typeOfWorkloadDTO: ITypeDTO;
  cityDTO: ICity;
  forStudents: boolean;
  immediateHiring: boolean;
  needExperience: boolean;
  disabledPeople: boolean;
  vacancyStatus: IVacancyStatus;
  salaryToNegotiate: boolean;
  salary?: string;
  benefits?: string;
  companyDTOInput?: ICompanyDTOInput;
  companyDTOOutput?: ICompanyDTOOutput;
  workSchedule?: string;
  competencies?: string[];
  skills?: IVacancySkill[];
  languages?: IVacancyLanguage[];
  certifications?: string[];
  otherRequirements?: string;
}
