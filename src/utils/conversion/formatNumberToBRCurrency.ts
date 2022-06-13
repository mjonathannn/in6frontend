import { getOnlyNumbersFromString } from './getOnlyNumbersFromString';

export const formatNumberToBRCurrency = (value: number | string): string => {
  if (typeof value === 'number') {
    return value.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  }

  let onlyNumbers = getOnlyNumbersFromString(value);
  if (!onlyNumbers) return '';

  const { length } = onlyNumbers;
  if (length === 2) onlyNumbers = `${onlyNumbers[0]}.${onlyNumbers[1]}`;
  else if (length > 2) {
    const significantPart = onlyNumbers.substring(0, length - 2);
    const fractionPart = onlyNumbers.substring(length - 2, length);

    onlyNumbers = `${significantPart}.${fractionPart}`;
  }

  return Number(onlyNumbers).toLocaleString('pt-br', {
    minimumFractionDigits: length - 1 > 2 ? 2 : length - 1,
    maximumFractionDigits: 2,
  });
};
