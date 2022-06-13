import { ICity } from './city';

export interface ICandidate {
  id: number;
  name: string;
  lastName: string;
  cpf: string;
  email: string;
  phone: string;
  occupation: string;
  whatsapp: string;
  cityDTO: ICity;
}
