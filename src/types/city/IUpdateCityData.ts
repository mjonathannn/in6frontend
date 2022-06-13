import { ITypeDTO } from 'types/ITypeDTO';

type UpdateDTO = Omit<ITypeDTO, 'type'>;

export interface IUpdateCityData {
  id: number;
  stateDTO: UpdateDTO;
}
