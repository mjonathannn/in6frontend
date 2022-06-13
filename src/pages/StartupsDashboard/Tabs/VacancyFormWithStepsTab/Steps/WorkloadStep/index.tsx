import { formStepInputStyles } from 'assets/styles/formStepInputStyles';
import { Input } from 'components/Input';
import { Select } from 'components/Select';
import { handleFormError } from 'errors/handleFormError';
import { useCallback, useEffect } from 'react';
import { IFormStepProps } from 'types/IFormStepProps';
import { GenerateInputStates, getInputStateValue } from 'utils';
import { typeOfWorkloadOptions } from 'utils/typeOptions';
import { StepSubTitle, StepTitle, TitleContainer } from '../StepTitle/styles';
import { Container, InputsContainer } from './styles';

export interface WorkloadStepData {
  typeOfWorkload: number;
  workSchedule?: string;
}

export const WorkloadStep: React.FC<IFormStepProps<WorkloadStepData>> = ({
  initialData = {} as WorkloadStepData,
  setStepDataFunction,
  errors,
}) => {
  const { typeOfWorkload, workSchedule } = initialData;

  const typeOfWorkloadStates = GenerateInputStates(
    'typeOfWorkload',
    typeOfWorkload,
  );
  const workScheduleStates = GenerateInputStates('workSchedule', workSchedule);

  const getUpdatedStepData = useCallback(() => {
    const updatedStatesObject = {
      typeOfWorkload: Number(getInputStateValue(typeOfWorkloadStates)),
      workSchedule: getInputStateValue(workScheduleStates),
    };

    return updatedStatesObject as WorkloadStepData;
  }, [typeOfWorkloadStates, workScheduleStates]);

  useEffect(() => {
    if (errors) {
      const stepStates = [typeOfWorkloadStates, workScheduleStates];
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
        <StepTitle>Jornada de trabalho</StepTitle>
        <StepSubTitle>
          Especifique o tipo de carga horária e os horários de dedicação para
          tornar sua vaga mais atrativa aos candidatos
        </StepSubTitle>
      </TitleContainer>

      <InputsContainer>
        <Select
          name="Tipo de carga horária"
          placeholder="selecionar tipo de carga horária"
          states={typeOfWorkloadStates}
          selectOptions={typeOfWorkloadOptions}
          style={formStepInputStyles}
        />

        <Input
          name="Horário de trabalho (Opcional)"
          placeholder="por exemplo, segunda a sexta, 8:00-17:00"
          states={workScheduleStates}
          style={formStepInputStyles}
        />
      </InputsContainer>
    </Container>
  );
};
