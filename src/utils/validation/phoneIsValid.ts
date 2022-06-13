import { getOnlyNumbersFromString } from 'utils/conversion';

export const phoneIsValid = (phone: string): boolean => {
  const onlyNumbers = getOnlyNumbersFromString(phone);
  return onlyNumbers.length >= 10;
};
