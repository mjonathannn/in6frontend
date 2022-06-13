import { IFindedVacancyStatus } from 'types/vacancy/IFindedVacancyStatus';
import {
  IVacancyStatusProp,
  VACANCY_STATUS_PROPS,
} from './typeOptions/vacancyStatusProps';

export const getVacancyStatusPropsFromStatus = (
  vacancyStatus: IFindedVacancyStatus,
): IVacancyStatusProp => {
  const { openVacancies, pausedVacancies, closedVacancies } =
    VACANCY_STATUS_PROPS;

  switch (vacancyStatus) {
    case 'ACEITANDOCURRICULOS':
      return openVacancies;
    case 'NAOACEITANDOCURRICULOS':
      return pausedVacancies;
    case 'VAGAENCERRADA':
      return closedVacancies;
    default:
      return openVacancies;
  }
};
