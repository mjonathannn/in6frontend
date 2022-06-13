import { ICompany } from './ICompany';

export interface ICompanyDTOOutput extends ICompany {
  firstVacancy: boolean;
}
