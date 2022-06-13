export const emailIsValid = (email: string): boolean => {
  const splittedEmail = email.split('@');
  return email !== splittedEmail[0] && splittedEmail[1].includes('.');
};
