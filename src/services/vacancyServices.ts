import { IFindedVacancy, IVacancy, IUpdateVacancyData } from 'types/vacancy';
import { hostApi } from './hostApi';

const servicesPrefix = 'vacancy';

export const deleteVacancy = async (id: number): Promise<number> => {
  const { status } = await hostApi.delete(
    `${servicesPrefix}/deleteVacancy/${id}`,
  );

  return status;
};

export const findOneVacancy = async (
  id: number,
): Promise<IFindedVacancy | undefined> => {
  const { data } = await hostApi.get<IFindedVacancy | undefined>(
    `${servicesPrefix}/findOneVacancy/${id}`,
  );

  return data;
};

export const updateVacancy = async (
  updatedVacancy: IUpdateVacancyData,
): Promise<void> => {
  await hostApi.put<IVacancy>(
    `${servicesPrefix}/updateVacancy`,
    updatedVacancy,
  );
};

export const createVacancy = async (
  vacancy: Omit<IUpdateVacancyData, 'id' | 'vacancyStatus'>,
): Promise<IFindedVacancy> => {
  const { data } = await hostApi.post<IFindedVacancy>(
    `${servicesPrefix}/createVacancy`,
    vacancy,
  );

  return data;
};

export const findAllVacancies = async (): Promise<IFindedVacancy[]> => {
  const { data } = await hostApi.get<IFindedVacancy[]>(
    'vacancy/findAllVacancies',
  );

  return data;
};

export const findAllVacanciesByCompany = async (
  email: string,
): Promise<IFindedVacancy[]> => {
  const { data } = await hostApi.get<IFindedVacancy[]>(
    `${servicesPrefix}/findAllVacanciesByCompany/${email}`,
  );

  return data;
};
