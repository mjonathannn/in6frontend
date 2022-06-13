import { IBusinessSector } from '../IBusinessSector';
import { ICity } from '../city/ICity';

export interface ICompany {
  id: number;
  name: string;
  cnpj: string;
  about: string;
  activated: boolean;
  email: string;
  phone: string;
  desktopNotifications: boolean;
  emailNotifications: boolean;
  whatsappNotifications: boolean;
  businessSectorDTO: IBusinessSector;
  cityDTO: ICity;
  logo?: string;
}
