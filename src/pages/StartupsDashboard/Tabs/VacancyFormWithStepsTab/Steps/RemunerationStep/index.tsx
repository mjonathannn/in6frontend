import { formStepInputStyles } from 'assets/styles/formStepInputStyles';
import { Input } from 'components/Input';
import { CheckboxInput } from 'components/Input/CheckboxInput';
import { TextAreaInput } from 'components/Input/TextAreaInput';
import { Select } from 'components/Select';
import { handleFormError } from 'errors/handleFormError';
import { useCallback, useEffect, useState } from 'react';
import { IFormStepProps } from 'types/IFormStepProps';
import { GenerateInputStates, getInputStateValue } from 'utils';
import { formatNumberToBRCurrency } from 'utils/conversion';
import { typeOfPayOptions } from 'utils/typeOptions';
import { StepSubTitle, StepTitle, TitleContainer } from '../StepTitle/styles';
import {
  Container,
  InputsContainer,
  BaseSalaryInputsContainer,
} from './styles';

export interface RemunerationStepData {
  typeOfPay: number;
  salaryToNegotiate: boolean;
  salary?: string;
  benefits?: string;
}

export const RemunerationStep: React.FC<
  IFormStepProps<RemunerationStepData>
> = ({
  initialData = {} as RemunerationStepData,
  setStepDataFunction,
  errors,
}) => {
  const {
    salary,
    salaryToNegotiate: initialSalaryToNegotiate,
    typeOfPay,
    benefits,
  } = initialData;

  const salaryStates = GenerateInputStates('salary', salary);
  const typeOfPayStates = GenerateInputStates('typeOfPay', typeOfPay);
  const benefitsStates = GenerateInputStates('benefits', benefits);

  const [salaryToNegotiate, setSalaryToNegotiate] = useState(
    !!initialSalaryToNegotiate,
  );

  const getUpdatedStepData = useCallback(() => {
    if (salaryStates.errorMessageState.value && salaryToNegotiate) {
      salaryStates.errorMessageState.setFunction('');
    }

    const updatedStatesObject = {
      salary: salaryToNegotiate ? undefined : getInputStateValue(salaryStates),
      typeOfPay: Number(getInputStateValue(typeOfPayStates)),
      benefits: getInputStateValue(benefitsStates),
      salaryToNegotiate,
    };

    return updatedStatesObject as RemunerationStepData;
  }, [salaryStates, benefitsStates, salaryToNegotiate, typeOfPayStates]);

  useEffect(() => {
    if (errors) {
      const stepStates = [salaryStates, typeOfPayStates, benefitsStates];
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
        <StepTitle>Remuneração</StepTitle>
        <StepSubTitle>
          Especifique o tipo de carga horária e os horários de dedicação para
          tornar sua vaga mais atrativa aos candidatos
        </StepSubTitle>
      </TitleContainer>

      <InputsContainer>
        <CheckboxInput
          style={{ fontSize: 16 }}
          label="Salário a combinar"
          defaultChecked={salaryToNegotiate}
          handleCheckboxUpdate={checked => setSalaryToNegotiate(checked)}
        />

        <BaseSalaryInputsContainer>
          <Input
            name="Salário base"
            disabled={salaryToNegotiate}
            placeholder="1.000,00"
            states={salaryStates}
            style={{ ...formStepInputStyles, width: 274 }}
            maxLength={18}
            onChange={({ target: { value } }) => {
              salaryStates.mainState.setFunction(
                formatNumberToBRCurrency(value),
              );
            }}
          />

          <Select
            name=""
            disabled={salaryToNegotiate}
            loadingIndicatorDisabled
            states={typeOfPayStates}
            selectOptions={typeOfPayOptions}
            style={{ ...formStepInputStyles, width: 202 }}
          />
        </BaseSalaryInputsContainer>

        <TextAreaInput
          name="Benefícios para os funcionários (Opcional)"
          placeholder="por exemplo, vale transporte ou alimentação"
          states={benefitsStates}
          style={formStepInputStyles}
          descriptionText="Adicione uma descrição de até 1000 caracteres"
          charactersLimitLength={1000}
        />
      </InputsContainer>
    </Container>
  );
};
