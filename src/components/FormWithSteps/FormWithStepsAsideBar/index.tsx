import { StepsType } from '..';
import { Container, StepButton } from './styles';

interface FormWithStepsAsideBarProps {
  STEPS: StepsType;
  selectedStepIndex: number;
  handleThrowbackStep: (stepsQuantity: number) => void;
}

export const FormWithStepsAsideBar: React.FC<FormWithStepsAsideBarProps> = ({
  STEPS,
  selectedStepIndex,
  handleThrowbackStep,
}) => {
  return (
    <Container>
      {Object.entries(STEPS).map(([key, { name }], index) => (
        <StepButton
          type="button"
          onClick={() => handleThrowbackStep(selectedStepIndex - index)}
          disabled={index > selectedStepIndex}
          isSelectedStep={selectedStepIndex === index}
          key={key}
        >
          {name.split(' (')[0]}
          <span>{name.includes('(Opcional)') && ' (Opcional)'}</span>
        </StepButton>
      ))}
    </Container>
  );
};
