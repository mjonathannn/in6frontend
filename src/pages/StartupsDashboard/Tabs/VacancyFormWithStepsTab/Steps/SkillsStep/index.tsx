import closeIcon from 'assets/img/close.svg';
import { formStepInputStyles } from 'assets/styles/formStepInputStyles';

import { PlusButton } from 'components/Buttons';
import { Input } from 'components/Input';
import { useCallback, useEffect, useState } from 'react';
import { IFormStepProps } from 'types/IFormStepProps';
import { IVacancySkill } from 'types/vacancy/IVacancySkill';
import { GenerateInputStates } from 'utils';
import { StepSubTitle, StepTitle, TitleContainer } from '../StepTitle/styles';
import {
  Container,
  InputsContainer,
  Skill,
  SkillsContainer,
  SkillInputContainer,
  SkillTextArea,
  SkillTextAreaDescription,
} from './styles';

export interface SkillsStepData {
  skills?: IVacancySkill[];
}

export const SkillsStep: React.FC<IFormStepProps<SkillsStepData>> = ({
  initialData = {} as SkillsStepData,
  setStepDataFunction,
}) => {
  const { skills: initialSkills } = initialData;

  const skillInputState = GenerateInputStates('skillInput');
  const [skills, setSkills] = useState<IVacancySkill[]>(initialSkills ?? []);

  const findSkillIndexByName = useCallback(
    (skillName: string) => {
      return skills.findIndex(
        ({ name }) =>
          name.localeCompare(skillName, 'pt-br', { sensitivity: 'base' }) === 0,
      );
    },
    [skills],
  );

  const handleAddSkill = useCallback(() => {
    const { value, setFunction } = skillInputState.mainState;
    if ((value as string).length === 0) return;

    if (findSkillIndexByName(value as string) !== -1)
      skillInputState.errorMessageState.setFunction('Habilidade já adicionada');
    else {
      setSkills(previousSkills => [
        ...previousSkills,
        {
          name: value as string,
          description: '',
        },
      ]);
    }

    setFunction('');
  }, [
    findSkillIndexByName,
    skillInputState.errorMessageState,
    skillInputState.mainState,
  ]);

  const handleExcludeSkill = useCallback((skillName: string) => {
    setSkills(previousSkills =>
      previousSkills.filter(
        comparativeSkill => comparativeSkill.name !== skillName,
      ),
    );
  }, []);

  const handleChangeSkillDescription = useCallback(
    (skillName: string, updatedDescription: string) => {
      const skillIndex = findSkillIndexByName(skillName);

      setSkills(previousSkills =>
        previousSkills.map((previousSkill, index) =>
          index === skillIndex
            ? {
                name: skillName,
                description: updatedDescription,
              }
            : previousSkill,
        ),
      );
    },
    [findSkillIndexByName],
  );

  useEffect(() => {
    if (setStepDataFunction) {
      setStepDataFunction({ skills: skills.length === 0 ? undefined : skills });
    }
  }, [skills, setStepDataFunction]);

  return (
    <Container>
      <TitleContainer>
        <StepTitle>Habilidades comportamentais</StepTitle>
        <StepSubTitle>
          Escolha até 4 habilidades interpessoais que os seus candidatos
          precisam ter para trabalhar nesta vaga
        </StepSubTitle>
      </TitleContainer>

      <InputsContainer>
        <span>{skills?.length ?? 0}/4 habilidades selecionadas</span>

        <Input
          disabled={skills?.length === 4}
          states={skillInputState}
          placeholder="por exemplo, Planejamento"
          style={formStepInputStyles}
        />

        <PlusButton
          onClick={handleAddSkill}
          disabled={skills?.length === 4}
          colorStyle="outline"
        >
          Adicionar
        </PlusButton>
      </InputsContainer>

      <SkillsContainer>
        {skills.map(({ name, description }) => (
          <div key={name}>
            <SkillInputContainer>
              <Skill>
                <span>{name}</span>

                <button type="button" onClick={() => handleExcludeSkill(name)}>
                  <img src={closeIcon} alt="Excluir competência" />
                </button>
              </Skill>

              <SkillTextArea
                value={description}
                placeholder="Diga como essa habilidade se relaciona com a vaga"
                autoComplete="off"
                onChange={({ target: { value } }) =>
                  handleChangeSkillDescription(name, value)
                }
                maxLength={500}
              />
            </SkillInputContainer>

            <SkillTextAreaDescription>
              <span className="input-description">
                Adicione uma descrição de até 500 caracteres
              </span>
              <span className="characters-counter">{`${description.length} / 500`}</span>
            </SkillTextAreaDescription>
          </div>
        ))}
      </SkillsContainer>
    </Container>
  );
};
