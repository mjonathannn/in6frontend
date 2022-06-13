import closeIcon from 'assets/img/close.svg';
import { formStepInputStyles } from 'assets/styles/formStepInputStyles';

import { PlusButton } from 'components/Buttons';
import { Input } from 'components/Input';
import { useCallback, useEffect, useState } from 'react';
import { IFormStepProps } from 'types/IFormStepProps';
import { GenerateInputStates } from 'utils';
import { StepSubTitle, StepTitle, TitleContainer } from '../StepTitle/styles';
import {
  Container,
  InputsContainer,
  CompetenciesContainer,
  Competency,
} from './styles';

export interface CompetenciesStepData {
  competencies?: string[];
}

export const CompetenciesStep: React.FC<
  IFormStepProps<CompetenciesStepData>
> = ({ initialData = {} as CompetenciesStepData, setStepDataFunction }) => {
  const { competencies: initialCompetencies } = initialData;

  const competencyInputStates = GenerateInputStates('competencyInput');
  const [competencies, setCompetencies] = useState<string[]>(
    initialCompetencies ?? [],
  );

  const handleAddCompetency = useCallback(() => {
    const { value, setFunction } = competencyInputStates.mainState;
    if ((value as string).length === 0) return;

    const findedCompetency = competencies.find(
      competency =>
        competency.localeCompare(value as string, 'pt-br', {
          sensitivity: 'base',
        }) === 0,
    );

    if (findedCompetency) {
      competencyInputStates.errorMessageState.setFunction(
        'Competência já adicionada',
      );
    } else {
      setCompetencies(previousCompetencies => [
        ...previousCompetencies,
        value as string,
      ]);
    }

    setFunction('');
  }, [
    competencyInputStates.errorMessageState,
    competencyInputStates.mainState,
    competencies,
  ]);

  const handleExcludeCompetency = useCallback((competency: string) => {
    setCompetencies(previousCompetencies =>
      previousCompetencies.filter(
        comparativeCompetency => comparativeCompetency !== competency,
      ),
    );
  }, []);

  useEffect(() => {
    if (setStepDataFunction) {
      setStepDataFunction({
        competencies: competencies.length === 0 ? undefined : competencies,
      });
    }
  }, [competencies, setStepDataFunction]);

  return (
    <Container>
      <TitleContainer>
        <StepTitle>Competências técnicas</StepTitle>
        <StepSubTitle>
          Adicione até 4 softwares ou equipamentos que os candidatos precisam
          dominar para trabalhar nesta vaga
        </StepSubTitle>
      </TitleContainer>

      <InputsContainer>
        <span>{competencies?.length ?? 0}/4 competências selecionadas</span>

        <Input
          disabled={competencies?.length === 4}
          states={competencyInputStates}
          placeholder="por exemplo, Power BI"
          style={formStepInputStyles}
        />

        <PlusButton
          onClick={handleAddCompetency}
          disabled={competencies?.length === 4}
          colorStyle="outline"
        >
          Adicionar
        </PlusButton>
      </InputsContainer>

      <CompetenciesContainer>
        {competencies.map(competency => (
          <Competency key={competency}>
            <span>{competency}</span>

            <button
              type="button"
              onClick={() => handleExcludeCompetency(competency)}
            >
              <img src={closeIcon} alt="Excluir competência" />
            </button>
          </Competency>
        ))}
      </CompetenciesContainer>
    </Container>
  );
};
