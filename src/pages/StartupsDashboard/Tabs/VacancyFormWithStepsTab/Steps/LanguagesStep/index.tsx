import closeIcon from 'assets/img/close.svg';
import { formStepInputStyles } from 'assets/styles/formStepInputStyles';

import { PlusButton } from 'components/Buttons';
import { Input } from 'components/Input';
import { Select } from 'components/Select';
import { useCallback, useEffect, useState } from 'react';
import { IFormStepProps } from 'types/IFormStepProps';
import { IVacancyLanguage } from 'types/vacancy/IVacancyLanguage';
import { GenerateInputStates } from 'utils';
import { StepSubTitle, StepTitle, TitleContainer } from '../StepTitle/styles';
import {
  Container,
  InputsContainer,
  Language,
  LanguagesContainer,
  LanguageInputContainer,
} from './styles';

export interface LanguagesStepData {
  languages?: IVacancyLanguage[];
}

const LANGUAGE_LEVEL_OPTIONS = [
  {
    id: 1,
    label: 'iniciante',
  },
  {
    id: 2,
    label: 'básico',
  },
  {
    id: 3,
    label: 'intermediário',
  },
  {
    id: 4,
    label: 'avançado',
  },
  {
    id: 5,
    label: 'proficiente',
  },
];

export const LanguagesStep: React.FC<IFormStepProps<LanguagesStepData>> = ({
  initialData = {} as LanguagesStepData,
  setStepDataFunction,
}) => {
  const { languages: initialLanguages } = initialData;

  const languageInputStates = GenerateInputStates('languageInput');
  const levelInputStates = GenerateInputStates('levelInput');
  const [languages, setLanguages] = useState<IVacancyLanguage[]>(
    initialLanguages ?? [],
  );

  const findLanguageIndexByName = useCallback(
    (languageName: string) => {
      return languages.findIndex(
        ({ name }) =>
          name.localeCompare(languageName, 'pt-br', { sensitivity: 'base' }) ===
          0,
      );
    },
    [languages],
  );

  const handleAddLanguage = useCallback(() => {
    const { value: languageValue, setFunction } = languageInputStates.mainState;
    if ((languageValue as string).length === 0) return;
    const { value: levelValue } = levelInputStates.mainState;

    if (findLanguageIndexByName(languageValue as string) !== -1)
      languageInputStates.errorMessageState.setFunction('Idioma já adicionado');
    else {
      setLanguages(previousLanguages => [
        ...previousLanguages,
        {
          name: languageValue as string,
          level: LANGUAGE_LEVEL_OPTIONS[Number(levelValue) - 1].label,
        },
      ]);
    }

    setFunction('');
  }, [
    findLanguageIndexByName,
    languageInputStates.errorMessageState,
    languageInputStates.mainState,
    levelInputStates.mainState,
  ]);

  const handleExcludeLanguage = useCallback((languageName: string) => {
    setLanguages(previousLanguages =>
      previousLanguages.filter(
        comparativeLanguage => comparativeLanguage.name !== languageName,
      ),
    );
  }, []);

  useEffect(() => {
    if (setStepDataFunction) {
      setStepDataFunction({
        languages: languages.length === 0 ? undefined : languages,
      });
    }
  }, [languages, setStepDataFunction]);

  return (
    <Container>
      <TitleContainer>
        <StepTitle>Idiomas</StepTitle>
        <StepSubTitle>
          Adicione até 4 idiomas que os candidatos precisam dominar para
          trabalhar nesta vaga
        </StepSubTitle>
      </TitleContainer>

      <InputsContainer>
        <span>{languages?.length ?? 0}/4 idiomas selecionados</span>

        <LanguageInputContainer>
          <Input
            name="Idioma"
            disabled={languages?.length === 4}
            states={languageInputStates}
            placeholder="inserir idioma"
            style={{ ...formStepInputStyles, width: 274 }}
          />

          <Select
            name="Nível"
            placeholder="nível"
            disabled={languages?.length === 4}
            states={levelInputStates}
            selectOptions={LANGUAGE_LEVEL_OPTIONS}
            loadingIndicatorDisabled
            style={{ ...formStepInputStyles, width: 202 }}
          />
        </LanguageInputContainer>

        <PlusButton
          onClick={handleAddLanguage}
          disabled={languages?.length === 4}
          colorStyle="outline"
        >
          Adicionar
        </PlusButton>
      </InputsContainer>

      <LanguagesContainer>
        {languages.map(({ name, level }) => (
          <Language key={name}>
            <span>{`${name}, ${level}`}</span>

            <button type="button" onClick={() => handleExcludeLanguage(name)}>
              <img src={closeIcon} alt="Excluir idioma" />
            </button>
          </Language>
        ))}
      </LanguagesContainer>
    </Container>
  );
};
