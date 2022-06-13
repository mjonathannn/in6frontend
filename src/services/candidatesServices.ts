import { ICandidate } from 'types/ICandidate';
import { hostApi } from './hostApi';

const servicesPrefix = 'candidate';

export const findAllCandidates = async (): Promise<ICandidate[]> => {
  const { data } = await hostApi.get<ICandidate[]>(
    `${servicesPrefix}/findAllCandidates`,
  );

  return data;
};

export const findOneCandidate = async (
  cpf: string,
): Promise<ICandidate | undefined> => {
  const { data } = await hostApi.get<ICandidate | undefined>(
    `${servicesPrefix}/findOneCandidate/${cpf}`,
  );

  return data;
};

export const findAllCandidatesByVacancy = async (
  vacancyId: number,
): Promise<ICandidate[]> => {
  const { data } = await hostApi.get<ICandidate[]>(
    `${servicesPrefix}/findAllCandidatesByVacancy/${vacancyId}`,
  );

  return data;
};

export const createCandidate = async (
  createCandidateData: ICandidate,
  vacancyId: number,
): Promise<number> => {
  const { status } = await hostApi.post(
    `${servicesPrefix}/createCandidate/${vacancyId}`,
    createCandidateData,
  );

  return status;
};
