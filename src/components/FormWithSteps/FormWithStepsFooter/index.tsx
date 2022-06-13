import { PrimaryButton, SimpleButton } from 'components/Buttons';
import { Container, SubContainer } from './styles';

interface FormWithStepsFooterProps {
  selectedStepIndex: number;
  stepsLength: number;
  lastStepAdvanceButtonText: string;
  handleUpdateSelectedStep: (
    updateType: 'throwback' | 'advance',
    selectedStepIndex: number,
  ) => void;
}

export const FormWithStepsFooter: React.FC<FormWithStepsFooterProps> = ({
  selectedStepIndex,
  stepsLength,
  lastStepAdvanceButtonText,
  handleUpdateSelectedStep,
}) => {
  return (
    <Container barPercentage={(selectedStepIndex / (stepsLength - 1)) * 100}>
      <SubContainer>
        <SimpleButton
          onClick={() =>
            handleUpdateSelectedStep('throwback', selectedStepIndex)
          }
        >
          {selectedStepIndex === 0 ? 'Cancelar' : 'Anterior'}
        </SimpleButton>

        <span>
          {selectedStepIndex + 1} de {stepsLength}
        </span>

        <PrimaryButton
          onClick={() => handleUpdateSelectedStep('advance', selectedStepIndex)}
        >
          {selectedStepIndex < stepsLength - 1
            ? 'Próximo'
            : lastStepAdvanceButtonText}
        </PrimaryButton>
      </SubContainer>
    </Container>
  );
};
