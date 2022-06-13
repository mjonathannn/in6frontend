import {
  HighBlue,
  HighGreen,
  HighRed,
  LowBlue,
  LowGreen,
  LowRed,
} from 'assets/colors/palette';

export interface IVacancyStatusProp {
  name: string;
  colors: {
    low: string;
    high: string;
  };
}

interface IVacancyStatusProps {
  openVacancies: IVacancyStatusProp;
  pausedVacancies: IVacancyStatusProp;
  closedVacancies: IVacancyStatusProp;
}

export const VACANCY_STATUS_PROPS: IVacancyStatusProps = {
  openVacancies: {
    name: 'Candidaturas abertas',
    colors: {
      low: LowGreen,
      high: HighGreen,
    },
  },
  pausedVacancies: {
    name: 'Candidaturas suspensas',
    colors: {
      low: LowRed,
      high: HighRed,
    },
  },
  closedVacancies: {
    name: 'Candidaturas encerradas',
    colors: {
      low: LowBlue,
      high: HighBlue,
    },
  },
};

export type VacancyStatusPropsKeysType = keyof typeof VACANCY_STATUS_PROPS;
