import { IBusinessSector } from 'types/IBusinessSector';
import { hostApi } from './hostApi';

const servicesPrefix = 'businessSector';

export const findAllBusinessSector = async (): Promise<IBusinessSector[]> => {
  const { data } = await hostApi.get<IBusinessSector[]>(
    `${servicesPrefix}/findAllBusinessSector`,
  );

  return data;
};
