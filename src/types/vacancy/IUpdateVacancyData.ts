import { IUpdateCityData } from 'types/city/IUpdateCityData';
import { ITypeDTO } from '../ITypeDTO';
import { IVacancy } from './IVacancy';

type UpdateDTO = Omit<ITypeDTO, 'type'>;
type Modify<T, R> = Omit<T, keyof R> & R;

export type IUpdateVacancyData = Modify<
  IVacancy,
  {
    cityDTO: IUpdateCityData;
    typeJobDTO: UpdateDTO;
    typeOfWorkloadDTO: UpdateDTO;
    typeOfPayDTO: UpdateDTO;
  }
>;
