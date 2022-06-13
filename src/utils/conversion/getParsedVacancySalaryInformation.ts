import { IFindedVacancy, IVacancy } from 'types/vacancy';
import { formatNumberToBRCurrency } from './formatNumberToBRCurrency';

export const getParsedVacancySalaryInformation = ({
  salaryToNegotiate,
  salary = '',
  typeOfPayDTO: { type },
}: IVacancy | IFindedVacancy): string => {
  if (salaryToNegotiate) return 'Salário a negociar';
  return `${formatNumberToBRCurrency(salary)} ${type}`;
};
