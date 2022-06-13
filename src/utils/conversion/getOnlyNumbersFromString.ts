export const getOnlyNumbersFromString = (text: string): string =>
  text.replace(/\D/g, '');
