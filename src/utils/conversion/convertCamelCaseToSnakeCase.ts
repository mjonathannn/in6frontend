export const convertCamelCaseToSnakeCase = (text: string): string => {
  const textParts = text.split(' ');
  textParts[0] = textParts[0].toLowerCase();

  return textParts
    .join('')
    .replaceAll(' ', '')
    .replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);
};
