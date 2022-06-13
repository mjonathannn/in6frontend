import { ICity } from 'types/city';
import { hostApi } from './hostApi';

const servicesPrefix = 'city';

export const findAllCitiesByState = async (id: number): Promise<ICity[]> => {
  const { data } = await hostApi.get<ICity[]>(
    `${servicesPrefix}/findAllCitiesByState/${id}`,
  );

  return data;
};
