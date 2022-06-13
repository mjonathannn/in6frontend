import { IFindedVacancyStatus } from './IFindedVacancyStatus';
import { IVacancy } from './IVacancy';

export type IFindedVacancy = Omit<IVacancy, 'vacancyStatus'> & {
  vacancyStatus: IFindedVacancyStatus;
};
