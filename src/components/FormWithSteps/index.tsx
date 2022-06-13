import { useFooter } from 'hooks/footer';
import { useEffect } from 'react';
import { FormWithStepsAsideBar } from './FormWithStepsAsideBar';
import { FormWithStepsFooter } from './FormWithStepsFooter';
import { Container, Header, MainContainer, StepContainer } from './styles';

export interface StepsType {
  [key: string]: {
    name: string;
  };
}

interface FormWithStepsProps {
  headerTitle: string;
  STEPS: StepsType;
  selectedStep: string;
  lastStepAdvanceButtonText: string;
  handleUpdateSelectedStep: (
    updateType: 'throwback' | 'advance',
    selectedStepIndex: number,
    throwbackStepsQuantity?: number,
  ) => void;
}

export const FormWithSteps: React.FC<FormWithStepsProps> = ({
  headerTitle,
  STEPS,
  selectedStep,
  handleUpdateSelectedStep,
  lastStepAdvanceButtonText,
  children,
}) => {
  const { updateIsFooterVisible } = useFooter();
  const STEPS_KEYS = Object.keys(STEPS);
  const selectedStepIndex = STEPS_KEYS.findIndex(
    stepKey => stepKey === selectedStep,
  );

  useEffect(() => {
    updateIsFooterVisible(false);
    return () => updateIsFooterVisible(true);
  }, [updateIsFooterVisible]);

  return (
    <Container>
      <Header>{headerTitle}</Header>

      <MainContainer>
        <FormWithStepsAsideBar
          handleThrowbackStep={throwbackStepsQuantity =>
            handleUpdateSelectedStep(
              'throwback',
              selectedStepIndex,
              throwbackStepsQuantity,
            )
          }
          selectedStepIndex={selectedStepIndex}
          STEPS={STEPS}
        />
        <StepContainer>{children}</StepContainer>
      </MainContainer>

      <FormWithStepsFooter
        selectedStepIndex={selectedStepIndex}
        handleUpdateSelectedStep={handleUpdateSelectedStep}
        stepsLength={STEPS_KEYS.length}
        lastStepAdvanceButtonText={lastStepAdvanceButtonText}
      />
    </Container>
  );
};
