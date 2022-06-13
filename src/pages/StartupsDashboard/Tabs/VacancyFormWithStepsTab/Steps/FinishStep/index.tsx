import immediateHiringIcon from 'assets/img/immediateHiring.svg';
import needExperienceIcon from 'assets/img/needExperience.svg';
import disabledPeopleIcon from 'assets/img/disabledPeople.svg';
import forStudentsIcon from 'assets/img/forStudents.svg';
import localTwo from 'assets/img/localTwo.svg';
import cooperativeHandshake from 'assets/img/cooperativeHandshake.svg';
import time from 'assets/img/time.svg';
import dollar from 'assets/img/dollar.svg';
import hexagonStrip from 'assets/img/hexagonStrip.svg';

import { useEffect, useState } from 'react';
import { findAllCitiesByState } from 'services/cityServices';
import {
  stateOptions,
  typeJobOptions,
  typeOfPayOptions,
  typeOfWorkloadOptions,
} from 'utils/typeOptions';
import { ICity } from 'types/city';
import { Loader } from 'components/Loader';
import { IFormStepProps } from 'types/IFormStepProps';
import { useHistory } from 'react-router-dom';
import { verifyIfVacancyHasRequirements } from 'utils/verifyIfVacancyHasRequirements';
import { AllStepsData } from '..';
import { StepSubTitle, StepTitle, TitleContainer } from '../StepTitle/styles';
import {
  Container,
  Requirement,
  RequirementContainer,
  RequirementWithDescription,
  VacancyAspects,
  VacancyContainer,
  VacancyData,
  VacancyDataLine,
  VacancyName,
  VacancyTopic,
} from './styles';

export const FinishStep: React.FC<IFormStepProps<AllStepsData>> = ({
  initialData = {} as AllStepsData,
}) => {
  const {
    location: { pathname },
  } = useHistory();
  const isVacancyCreation = pathname.endsWith('createVacancy');

  const {
    vacancyDefinitionStep,
    workloadStep,
    remunerationStep,
    competenciesStep: { competencies },
    skillsStep: { skills },
    languagesStep: { languages },
    certificationsStep: { certifications },
    otherRequirementsStep: { otherRequirements },
  } = initialData;

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [parsedCityAndState, setParsedCityAndState] = useState('');

  useEffect(() => {
    const { city: cityId, state: stateId } = vacancyDefinitionStep;

    findAllCitiesByState(Number(stateId)).then(cities => {
      const findedCity = cities.find(
        city => city.id === Number(cityId),
      ) as ICity;

      setParsedCityAndState(
        `${findedCity.name}, ${stateOptions[Number(stateId) - 1].label}`,
      );
      setIsLoadingData(false);
    });
  }, [vacancyDefinitionStep]);

  return (
    <Container>
      <TitleContainer>
        <StepTitle>{`Revisar e ${
          isVacancyCreation ? 'publicar' : 'atualizar'
        } vaga`}</StepTitle>
        <StepSubTitle>
          {[
            `Revise todas as informações da vaga para que ela seja ${
              isVacancyCreation ? 'publicada' : 'atualizada'
            } corretamente.`,
            isVacancyCreation
              ? 'Mas, caso precise, você pode editar posteriormente'
              : '',
          ].join(' ')}
        </StepSubTitle>
      </TitleContainer>

      {isLoadingData ? (
        <Loader style={{ minHeight: 420 }} />
      ) : (
        <VacancyContainer>
          <VacancyName>{vacancyDefinitionStep.name}</VacancyName>

          <VacancyAspects>
            {vacancyDefinitionStep.immediateHiring && (
              <div>
                <img src={immediateHiringIcon} alt="Contratação imediata" />
                <small>Contratação imediata</small>
              </div>
            )}
            {vacancyDefinitionStep.needExperience && (
              <div>
                <img src={needExperienceIcon} alt="Requer experiência" />
                <small>Requer experiência</small>
              </div>
            )}
            {vacancyDefinitionStep.disabledPeople && (
              <div>
                <img src={disabledPeopleIcon} alt="Pessoas com deficiência" />
                <small>PCD</small>
              </div>
            )}
            {vacancyDefinitionStep.forStudents && (
              <div>
                <img src={forStudentsIcon} alt="Para estudantes" />
                <small>Para estudantes</small>
              </div>
            )}
          </VacancyAspects>

          <VacancyData>
            <VacancyDataLine>
              <img src={localTwo} alt="Localização" />
              <p>{parsedCityAndState}</p>
            </VacancyDataLine>

            <VacancyDataLine>
              <img src={cooperativeHandshake} alt="Aperto de mãos" />
              <p>
                {
                  typeJobOptions[Number(vacancyDefinitionStep.typeJob) - 1]
                    .label
                }
              </p>
            </VacancyDataLine>

            <VacancyDataLine>
              <img src={time} alt="Relógio" />
              <p>
                {
                  typeOfWorkloadOptions[Number(workloadStep.typeOfWorkload) - 1]
                    .label
                }
              </p>
              {workloadStep.workSchedule && <p>{workloadStep.workSchedule}</p>}
            </VacancyDataLine>

            <VacancyDataLine>
              <img src={dollar} alt="Dólar" />
              <p>
                {remunerationStep.salaryToNegotiate
                  ? 'Salário a negociar'
                  : `${remunerationStep.salary} ${
                      typeOfPayOptions[Number(remunerationStep.typeOfPay) - 1]
                        .label
                    }`}
              </p>
            </VacancyDataLine>

            {remunerationStep.benefits && (
              <VacancyDataLine>
                <img src={hexagonStrip} alt="Hexágono" />
                <p>{remunerationStep.benefits}</p>
              </VacancyDataLine>
            )}
          </VacancyData>

          <VacancyTopic>
            <h3 className="topic-title">Descrição das atividades</h3>
            <p className="content">{vacancyDefinitionStep.description}</p>
          </VacancyTopic>

          {verifyIfVacancyHasRequirements({
            otherRequirements,
            competencies,
            certifications,
            languages,
            skills,
          }) && (
            <VacancyTopic>
              <h3 className="topic-title">Requisitos</h3>
              <p className="content">{otherRequirements}</p>
            </VacancyTopic>
          )}

          {competencies && (
            <RequirementContainer>
              <span>Competências técnicas</span>

              <div>
                {competencies.map(competency => (
                  <Requirement key={competency}>{competency}</Requirement>
                ))}
              </div>
            </RequirementContainer>
          )}

          {skills && (
            <RequirementContainer>
              <span>Habilidades comportamentais</span>

              <div>
                {skills.map(({ name, description }) => (
                  <RequirementWithDescription key={name}>
                    <Requirement>{name}</Requirement>
                    <p>{description}</p>
                  </RequirementWithDescription>
                ))}
              </div>
            </RequirementContainer>
          )}

          {languages && (
            <RequirementContainer>
              <span>Idiomas</span>

              <div>
                {languages.map(({ name, level }) => (
                  <Requirement key={name}>
                    {name}, {level}
                  </Requirement>
                ))}
              </div>
            </RequirementContainer>
          )}

          {certifications && (
            <RequirementContainer>
              <span>Certificações</span>

              <div>
                {certifications.map(certification => (
                  <Requirement key={certification}>{certification}</Requirement>
                ))}
              </div>
            </RequirementContainer>
          )}
        </VacancyContainer>
      )}
    </Container>
  );
};
