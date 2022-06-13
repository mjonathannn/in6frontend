import closeIcon from 'assets/img/close.svg';
import { formStepInputStyles } from 'assets/styles/formStepInputStyles';

import { PlusButton } from 'components/Buttons';
import { Input } from 'components/Input';
import { useCallback, useEffect, useState } from 'react';
import { IFormStepProps } from 'types/IFormStepProps';
import { GenerateInputStates } from 'utils';
import { StepSubTitle, StepTitle, TitleContainer } from '../StepTitle/styles';
import {
  Certification,
  CertificationsContainer,
  Container,
  InputsContainer,
} from './styles';

export interface CertificationsStepData {
  certifications?: string[];
}

export const CertificationsStep: React.FC<
  IFormStepProps<CertificationsStepData>
> = ({ initialData = {} as CertificationsStepData, setStepDataFunction }) => {
  const { certifications: initialCertifications } = initialData;

  const certificationInputStates = GenerateInputStates('CertificationInput');
  const [certifications, setCertifications] = useState<string[]>(
    initialCertifications ?? [],
  );

  const handleAddCertification = useCallback(() => {
    const { value, setFunction } = certificationInputStates.mainState;
    if ((value as string).length === 0) return;

    const findedCertification = certifications.find(
      certification =>
        certification.localeCompare(value as string, 'pt-br', {
          sensitivity: 'base',
        }) === 0,
    );

    if (findedCertification) {
      certificationInputStates.errorMessageState.setFunction(
        'Certificação já adicionada',
      );
    } else {
      setCertifications(previousCertifications => [
        ...previousCertifications,
        value as string,
      ]);
    }

    setFunction('');
  }, [
    certificationInputStates.mainState,
    certificationInputStates.errorMessageState,
    certifications,
  ]);

  const handleExcludeCertification = useCallback((certification: string) => {
    setCertifications(previousCertifications =>
      previousCertifications.filter(
        comparativeCertification => comparativeCertification !== certification,
      ),
    );
  }, []);

  useEffect(() => {
    if (setStepDataFunction) {
      setStepDataFunction({
        certifications:
          certifications.length === 0 ? undefined : certifications,
      });
    }
  }, [certifications, setStepDataFunction]);

  return (
    <Container>
      <TitleContainer>
        <StepTitle>Certificações</StepTitle>
        <StepSubTitle>
          Adicione até 4 certificações necessárias para a vaga, como habilitação
          automobilistica, ANBIMA ou de cursos específicos
        </StepSubTitle>
      </TitleContainer>

      <InputsContainer>
        <span>{certifications?.length ?? 0}/4 certificações selecionadas</span>

        <Input
          disabled={certifications?.length === 4}
          states={certificationInputStates}
          placeholder="por exemplo, Habilitação tipo B"
          style={formStepInputStyles}
        />

        <PlusButton
          onClick={handleAddCertification}
          disabled={certifications?.length === 4}
          colorStyle="outline"
        >
          Adicionar
        </PlusButton>
      </InputsContainer>

      <CertificationsContainer>
        {certifications.map(certification => (
          <Certification key={certification}>
            <span>{certification}</span>

            <button
              type="button"
              onClick={() => handleExcludeCertification(certification)}
            >
              <img src={closeIcon} alt="Excluir competência" />
            </button>
          </Certification>
        ))}
      </CertificationsContainer>
    </Container>
  );
};
