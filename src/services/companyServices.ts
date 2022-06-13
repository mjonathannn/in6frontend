import { AxiosResponse } from 'axios';
import {
  ICompany,
  IUpdateCompanyData,
  ICreateCompanyData,
} from 'types/company';

import { hostApi } from './hostApi';

interface IToken {
  token: string;
}

const servicesPrefix = 'company';

export const existsEmail = async (email: string): Promise<boolean> => {
  const { data } = await hostApi.get(`${servicesPrefix}/existsEmail/${email}`);
  return data;
};

export const authenticateCompany = async (body: {
  email: string;
  password: string;
}): Promise<AxiosResponse<IToken>> => {
  const response = await hostApi.post<IToken>(
    `${servicesPrefix}/authenticateCompany`,
    body,
  );

  return response;
};

export const authenticateCompanyNonExpireToken = async (body: {
  email: string;
  password: string;
}): Promise<AxiosResponse<IToken>> => {
  const response = await hostApi.post<IToken>(
    `${servicesPrefix}/authenticateCompanyNonExpireToken`,
    body,
  );

  return response;
};

export const existsPhone = async (phone: string): Promise<boolean> => {
  const { data } = await hostApi.get(`${servicesPrefix}/existsPhone/${phone}`);
  return data;
};

export const createCompany = async (
  createCompanyData: ICreateCompanyData,
): Promise<number> => {
  const { status } = await hostApi.post(
    `${servicesPrefix}/createCompany`,
    createCompanyData,
  );

  return status;
};

export const isAuthenticated = async (body: {
  token: string;
}): Promise<boolean> => {
  const { data } = await hostApi.post(
    `${servicesPrefix}/isAuthenticated`,
    body,
  );

  return data;
};

export const verifyActivationEmailSended = async (
  email: string,
): Promise<{ id: number; emailSended: boolean }> => {
  const { data } = await hostApi.get(
    `${servicesPrefix}/verifyActivationEmailSended/${email}`,
  );

  return data;
};

export const verifyActivation = async (email: string): Promise<boolean> => {
  const { data } = await hostApi.get(
    `${servicesPrefix}/verifyActivation/${email}`,
  );

  return data;
};

export const findOneCompany = async (
  email: string,
): Promise<ICompany | undefined> => {
  const { data } = await hostApi.get<ICompany | undefined>(
    `${servicesPrefix}/findOneCompany/${email}`,
  );

  return data;
};

export const updateCompany = async (
  updatedCompany: IUpdateCompanyData,
): Promise<number> => {
  const { status } = await hostApi.put(
    `${servicesPrefix}/updateCompany`,
    updatedCompany,
  );

  return status;
};

export const updateCompanyPassword = async (body: {
  email: string;
  password: string;
}): Promise<number> => {
  const { status } = await hostApi.put(
    `${servicesPrefix}/updateCompanyPassword`,
    body,
  );

  return status;
};

export const updateCompanyEmail = async (
  actualEmail: string,
  newEmail: string,
): Promise<number> => {
  const { status } = await hostApi.put(
    `${servicesPrefix}/updateCompanyEmail/${actualEmail}/${newEmail}`,
  );

  return status;
};
