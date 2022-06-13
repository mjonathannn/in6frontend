import { getOnlyNumbersFromString } from 'utils/conversion';

export const cnpjIsValid = (cnpj: string): boolean => {
  const onlyNumbers = getOnlyNumbersFromString(cnpj);
  return onlyNumbers.length === 14;
};
