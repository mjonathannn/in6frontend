import { Input } from 'components/Input';
import { GenerateInputStates, getInputStateValue } from 'utils';
import { useCallback, useEffect, useState } from 'react';
import { Select } from 'components/Select';
import { stateOptions, typeJobOptions } from 'utils/typeOptions';
import { CheckboxInput } from 'components/Input/CheckboxInput';
import { findAllCitiesByState } from 'services/cityServices';
import { OptionTypeBase } from 'react-select';
import { TextAreaInput } from 'components/Input/TextAreaInput';
import { handleFormError } from 'errors/handleFormError';
import { IFormStepProps } from 'types/IFormStepProps';
import { formStepInputStyles } from 'assets/styles/formStepInputStyles';
import { Container, InputsContainer } from './styles';
import { StepSubTitle, StepTitle, TitleContainer } from '../StepTitle/styles';

export { validateVacancyDefinitionData } from './validateVacancyDefinitionData';

export interface VacancyDefinitionStepData {
  name: string;
  typeJob: number;
  immediateHiring: boolean;
  needExperience: boolean;
  forStudents: boolean;
  disabledPeople: boolean;
  state: number;
  city: number;
  description: string;
}

export const VacancyDefinitionStep: React.FC<
  IFormStepProps<VacancyDefinitionStepData>
> = ({
  initialData = {} as VacancyDefinitionStepData,
  setStepDataFunction,
  errors,
}) => {
  const {
    name,
    typeJob,
    state,
    city,
    description,
    immediateHiring: initialImmediateHiring,
    needExperience: initialNeedExperience,
    disabledPeople: initialDisabledPeople,
    forStudents: initialForStudents,
  } = initialData;

  const nameStates = GenerateInputStates('name', name);
  const typeJobStates = GenerateInputStates('typeJob', typeJob);
  const stateStates = GenerateInputStates('state', state);
  const cityStates = GenerateInputStates('city', city);
  const descriptionStates = GenerateInputStates('description', description);

  const [immediateHiring, setImmediateHiring] = useState(
    !!initialImmediateHiring,
  );
  const [needExperience, setNeedExperience] = useState(!!initialNeedExperience);
  const [disabledPeople, setDisabledPeople] = useState(!!initialDisabledPeople);
  const [forStudents, setForStudents] = useState(!!initialForStudents);

  const [cities, setCities] = useState<OptionTypeBase[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  useEffect(() => {
    const { value: stateValue } = stateStates.mainState;

    if (stateValue) {
      findAllCitiesByState(Number(stateValue)).then(findedCities => {
        setCities(findedCities.map(({ id, name: label }) => ({ id, label })));
        const { value: cityValue, setFunction: setCityFunction } =
          cityStates.mainState;

        if (state !== Number(stateValue) || city !== Number(cityValue)) {
          setCityFunction(findedCities[0].id.toString());
        }

        setIsLoadingCities(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cityStates.mainState.setFunction,
    city,
    state,
    stateStates.mainState.value,
  ]);

  const getUpdatedStepData = useCallback(() => {
    const updatedStatesObject = {
      name: getInputStateValue(nameStates),
      typeJob: Number(getInputStateValue(typeJobStates)),
      state: Number(getInputStateValue(stateStates)),
      city: Number(getInputStateValue(cityStates)),
      description: getInputStateValue(descriptionStates),
      immediateHiring,
      disabledPeople,
      forStudents,
      needExperience,
    };

    return updatedStatesObject as VacancyDefinitionStepData;
  }, [
    cityStates,
    descriptionStates,
    disabledPeople,
    forStudents,
    immediateHiring,
    needExperience,
    stateStates,
    typeJobStates,
    nameStates,
  ]);

  useEffect(() => {
    if (errors) {
      const stepStates = [
        nameStates,
        typeJobStates,
        stateStates,
        cityStates,
        descriptionStates,
      ];

      handleFormError(errors, stepStates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    if (setStepDataFunction) {
      const updatedData = getUpdatedStepData();
      setStepDataFunction(updatedData);
    }
  }, [getUpdatedStepData, setStepDataFunction]);

  return (
    <Container>
      <TitleContainer>
        <StepTitle>Definindo a vaga</StepTitle>
        <StepSubTitle>
          Faça uma descrição geral da vaga adicionando informações como nome do
          cargo, tipo de trabalho e atividades a serem executadas
        </StepSubTitle>
      </TitleContainer>

      <InputsContainer>
        <Input
          name="Nome do cargo"
          placeholder="por exemplo, UX Desinger"
          states={nameStates}
          style={formStepInputStyles}
        />

        <Select
          name="Tipo de trabalho"
          placeholder="selecionar tipo de trabalho"
          states={typeJobStates}
          selectOptions={typeJobOptions}
          style={formStepInputStyles}
        />

        <CheckboxInput
          style={{ fontSize: 16 }}
          label="Contratação imediata"
          defaultChecked={immediateHiring}
          handleCheckboxUpdate={checked => setImmediateHiring(checked)}
        />
        <CheckboxInput
          style={{ fontSize: 16 }}
          label="Requer experiencia profissional na função"
          defaultChecked={needExperience}
          handleCheckboxUpdate={checked => setNeedExperience(checked)}
        />
        <CheckboxInput
          style={{ fontSize: 16 }}
          label="Para pessoas com deficiência (PCD)"
          defaultChecked={disabledPeople}
          handleCheckboxUpdate={checked => setDisabledPeople(checked)}
        />
        <CheckboxInput
          style={{ fontSize: 16 }}
          label="Para estudantes/universitários"
          defaultChecked={forStudents}
          handleCheckboxUpdate={checked => setForStudents(checked)}
        />

        <Select
          name="Estado"
          placeholder="selecionar estado onde mora"
          states={stateStates}
          selectOptions={stateOptions}
          onChange={() => setIsLoadingCities(true)}
          style={formStepInputStyles}
        />
        <Select
          name="Cidade"
          disabled={isLoadingCities}
          placeholder="selecionar cidade onde mora"
          states={cityStates}
          selectOptions={cities}
          style={formStepInputStyles}
        />

        <TextAreaInput
          name="Descrição das atividades"
          placeholder="adicionar atividade de trabalho"
          states={descriptionStates}
          style={formStepInputStyles}
          descriptionText="Adicione uma descrição de 300 a 4000 caracteres"
          charactersLimitLength={4000}
        />
      </InputsContainer>
    </Container>
  );
};
