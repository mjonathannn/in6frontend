interface IObject {
  cityDTO: {
    name: string;
    stateDTO: {
      name: string;
    };
  };
}

export const convertCityDTOToCityAndStateString = ({
  cityDTO,
}: IObject): string => {
  return `${cityDTO.name}, ${cityDTO.stateDTO.name}`;
};
