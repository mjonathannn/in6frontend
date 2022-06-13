import { IUpdateCityData } from 'types/city';
import { IBusinessSector } from '../IBusinessSector';

export interface ICreateCompanyData {
  name: string;
  password: string;
  email: string;
  phone: string;
  businessSectorDTO: Omit<IBusinessSector, 'sector'>;
  cityDTO: IUpdateCityData;
}
