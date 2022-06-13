import { IBusinessSector } from 'types/IBusinessSector';
import { ITypeDTO } from '../ITypeDTO';
import { ICompany } from './ICompany';

type Modify<T, R> = Omit<T, keyof R> & R;

interface IUpdateCityData {
  id: number;
  stateDTO: Omit<ITypeDTO, 'type'>;
}

export type IUpdateCompanyData = Modify<
  Omit<ICompany, 'activated'>,
  {
    cityDTO: IUpdateCityData;
    businessSectorDTO: Omit<IBusinessSector, 'sector'>;
  }
>;
