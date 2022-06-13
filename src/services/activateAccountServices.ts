import { hostApi } from './hostApi';

const servicesPrefix = 'activateAccount';

export const sendEmail = async (
  id: number,
  email: string,
  shortBaseURLFrontend: string,
): Promise<number> => {
  const { status } = await hostApi.get(
    `${servicesPrefix}/sendEmail/${id}/${email}/${shortBaseURLFrontend}`,
  );

  return status;
};

export const activateAccount = async (id: number): Promise<number> => {
  const { status } = await hostApi.get(`${servicesPrefix}/activate/${id}`);
  return status;
};
