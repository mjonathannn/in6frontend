import { formStepInputStyles } from 'assets/styles/formStepInputStyles';
import { TextAreaInput } from 'components/Input/TextAreaInput';
import { handleFormError } from 'errors/handleFormError';
import { useEffect } from 'react';
import { IFormStepProps } from 'types/IFormStepProps';
import { GenerateInputStates } from 'utils';
import { StepSubTitle, StepTitle, TitleContainer } from '../StepTitle/styles';
import { Container } from './styles';

export interface OtherRequirementsStepData {
  otherRequirements?: string;
}

export const OtherRequirementsStep: React.FC<
  IFormStepProps<OtherRequirementsStepData>
> = ({
  initialData = {} as OtherRequirementsStepData,
  setStepDataFunction,
  errors,
}) => {
  const { otherRequirements: initialOtherRequirements } = initialData;

  const otherRequirementsStates = GenerateInputStates(
    'otherRequirements',
    initialOtherRequirements ?? '',
  );

  useEffect(() => {
    if (errors) handleFormError(errors, [otherRequirementsStates]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    const otherRequirements = otherRequirementsStates.mainState.value as string;
    if (setStepDataFunction) {
      setStepDataFunction({
        otherRequirements:
          otherRequirements.length === 0 ? undefined : otherRequirements,
      });
    }
  }, [otherRequirementsStates.mainState.value, setStepDataFunction]);

  return (
    <Container>
      <TitleContainer>
        <StepTitle>Outros requisitos</StepTitle>
        <StepSubTitle>
          Especifique aqui outros requisitos para a vaga além das competências,
          habilidades, idiomas e certificações já informadas
        </StepSubTitle>
      </TitleContainer>

      <TextAreaInput
        name="Outros requisitos para concorrer a esta vaga (Opcional)"
        placeholder="adicionar atividade de trabalho"
        states={otherRequirementsStates}
        style={formStepInputStyles}
        descriptionText="Adicione uma descrição de 300 a 1000 caracteres"
        charactersLimitLength={1000}
      />
    </Container>
  );
};
