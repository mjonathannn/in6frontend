import { Switch } from 'components/Switch';
import timeIcon from 'assets/img/time.svg';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BsArrowDown } from 'react-icons/bs';
import { IFindedVacancy, IFindedVacancyStatus } from 'types/vacancy';
import {
  getVacancyStatusPropsFromStatus,
  getAverageColorFromImage,
} from 'utils';
import { HighGreen, HighRed, PrimaryColor } from 'assets/colors/palette';

import { updateVacancy } from 'services/vacancyServices';
import { SecondaryButton, SimpleButton } from 'components/Buttons';
import { useStartup } from 'hooks/startup';

import html2canvas from 'html2canvas';
import { Loader } from 'components/Loader';
import {
  getLowAndHighColorsFromRGB,
  convertCityDTOToCityAndStateString,
  convertCamelCaseToSnakeCase,
} from 'utils/conversion';

import { verifyIfVacancyHasRequirements } from 'utils/verifyIfVacancyHasRequirements';
import { vacancyRequirementsExample } from 'utils/vacancyRequirementsExample';
import {
  VacancyStatusBar,
  VacancyDateInformation,
  VacancyStatusDate,
  VacancyPeriod,
  MainContainer,
  VacancyDataContainer,
  VacancyDataContainerTitle,
  DataLine,
  LineTitle,
  RequirementsListContainer,
  Requirement,
  VacancyPostContainer,
  VacancySpecificationsContainer,
  VacancySpecification,
  LinkContainer,
  MoreDetailsContainer,
  VacancyPost,
  VacancyPostDescription,
  PostActionButtonsContainer,
  RequirementDescription,
} from './styles';

interface ColorType {
  low: string;
  high: string;
}

interface VacancyInformationProps {
  vacancy: IFindedVacancy;
}

const VACANCY_SPECIFICATIONS = {
  immediateHiring: 'Contratação imediata',
  needExperience: 'Requer experiência',
  disabledPeople: 'Para PcD',
  forStudents: 'Para estudantes',
};

const VACANCY_POST_COLORS = {
  default: {
    low: 'rgb(255, 75, 0, 0.1)',
    high: PrimaryColor,
  },
  disabled: {
    low: 'rgba(0, 0, 0, 0.1)',
    high: '#000000',
  },
};

export const VacancyInformation: React.FC<VacancyInformationProps> = ({
  vacancy,
}) => {
  // eslint-disable-next-line no-param-reassign
  vacancy = {
    ...vacancy,
    ...vacancyRequirementsExample,
  };

  const {
    startupData: { name: startupName, logo: startupLogo },
  } = useStartup();

  const vacancyPostRef = useRef<HTMLDivElement>(null);
  const [isLoadingVacancyPostColors, setIsLoadingVacancyPostColors] =
    useState(true);
  const [vacancyPostColors, setVacancyPostColors] = useState<ColorType>(
    VACANCY_POST_COLORS[
      vacancy.vacancyStatus !== 'ACEITANDOCURRICULOS' ? 'disabled' : 'default'
    ],
  );
  const [vacancyStatus, setVacancyStatus] = useState<IFindedVacancyStatus>(
    vacancy.vacancyStatus,
  );

  const { colors: vacancyStatusColors } = useMemo(
    () => getVacancyStatusPropsFromStatus(vacancyStatus),
    [vacancyStatus],
  );

  useEffect(() => {
    if (vacancy.vacancyStatus === 'ACEITANDOCURRICULOS' && startupLogo) {
      const logo = new Image();
      logo.src = startupLogo;

      logo.onload = () => {
        const averageLogoColor = getAverageColorFromImage(logo);

        setVacancyPostColors(getLowAndHighColorsFromRGB(averageLogoColor));
        setIsLoadingVacancyPostColors(false);
      };
    } else setIsLoadingVacancyPostColors(false);
  }, [startupLogo, vacancy.vacancyStatus]);

  const updateVacancyStatus = (updatedStatus: boolean) =>
    setVacancyStatus(
      updatedStatus ? 'NAOACEITANDOCURRICULOS' : 'ACEITANDOCURRICULOS',
    );

  const handleOnChangeSwitchStatus = useCallback(
    async (updatedStatus: boolean) => {
      try {
        await updateVacancy({
          ...vacancy,
          vacancyStatus: Number(updatedStatus),
        });

        updateVacancyStatus(updatedStatus);
      } catch {
        alert('Algo deu errado.');
      }
    },
    [vacancy],
  );

  const postDescription = useMemo(() => {
    const textParts = [];
    textParts.push(
      `Venha trabalhar com a gente! A ${startupName} está com vaga aberta `,
    );
    textParts.push(
      `para trabalhar como ${vacancy.name}. Para se candidatar e saber mais `,
    );
    textParts.push(
      `informações sobre esta vaga acesse: www.in6.com.br/${convertCamelCaseToSnakeCase(
        startupName,
      )}`,
    );
    textParts.push(
      '\nConhece alguém que seria perfeito para o trabalho? Não deixe ',
    );
    textParts.push(
      'de encaminhar esse post ou marcar a pessoa nos comentários!',
    );

    return textParts.join('');
  }, [startupName, vacancy.name]);

  const handleCopyPostText = useCallback(async () => {
    await navigator.clipboard.writeText(postDescription);
    alert('Texto copiado para a área de transferência!');
  }, [postDescription]);

  const handleDownloadPostImage = useCallback(() => {
    if (!vacancyPostRef.current) return;

    html2canvas(vacancyPostRef.current, {
      scale: 3,
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `${startupName}_${vacancy.name}-post.png`.replaceAll(
        ' ',
        '_',
      );
      link.href = canvas.toDataURL('image/png', 1);
      link.click();
    });
  }, [startupName, vacancy.name]);

  return (
    <>
      <VacancyStatusBar colors={vacancyStatusColors}>
        <VacancyDateInformation>
          <VacancyStatusDate>
            <img src={timeIcon} alt="Relógio" />
            <span>
              {vacancyStatus === 'VAGAENCERRADA'
                ? 'Encerrada há '
                : 'Encerra em '}
              30 dias
            </span>
          </VacancyStatusDate>

          <VacancyPeriod>
            <span>Duração da vaga</span>
            <p>01 maio 2022 - 30 maio 2022</p>
          </VacancyPeriod>
        </VacancyDateInformation>

        {vacancyStatus !== 'VAGAENCERRADA' && (
          <Switch
            name={`Candidaturas ${
              vacancyStatus === 'ACEITANDOCURRICULOS' ? 'abertas' : 'suspensas'
            }`}
            offColor={HighGreen}
            onColor={HighRed}
            state={[
              vacancyStatus === 'NAOACEITANDOCURRICULOS',
              handleOnChangeSwitchStatus,
            ]}
          />
        )}
      </VacancyStatusBar>

      <MainContainer>
        <VacancyDataContainer>
          <VacancyDataContainerTitle>
            Informações gerais
          </VacancyDataContainerTitle>

          <DataLine>
            <LineTitle>Tipo do cargo</LineTitle>
            <p>{vacancy.typeJobDTO.type}</p>
          </DataLine>

          <DataLine>
            <LineTitle>Localização do trabalho</LineTitle>
            <p>{convertCityDTOToCityAndStateString(vacancy)}</p>
          </DataLine>

          <DataLine>
            <LineTitle>Contratação Imediata</LineTitle>
            <p>{vacancy.immediateHiring ? 'Sim' : 'Não'}</p>
          </DataLine>

          <DataLine>
            <LineTitle>Requer experiência</LineTitle>
            <p>{vacancy.needExperience ? 'Sim' : 'Não'}</p>
          </DataLine>

          <DataLine>
            <LineTitle>Para Pessoas com deficiência</LineTitle>
            <p>{vacancy.disabledPeople ? 'Sim' : 'Não'}</p>
          </DataLine>

          <DataLine>
            <LineTitle>Para estudantes</LineTitle>
            <p>{vacancy.forStudents ? 'Sim' : 'Não'}</p>
          </DataLine>
        </VacancyDataContainer>

        <VacancyDataContainer>
          <VacancyDataContainerTitle>
            Descrição da vaga
          </VacancyDataContainerTitle>
          <p>{vacancy.description}</p>
        </VacancyDataContainer>

        <VacancyDataContainer>
          <VacancyDataContainerTitle>
            Jornada de trabalho
          </VacancyDataContainerTitle>

          <DataLine>
            <LineTitle>Tipo de carga horária</LineTitle>
            <p>{vacancy.typeOfWorkloadDTO.type}</p>
          </DataLine>

          {vacancy.workSchedule && (
            <DataLine>
              <LineTitle>Horário de trabalho</LineTitle>
              <p>{vacancy.workSchedule}</p>
            </DataLine>
          )}
        </VacancyDataContainer>

        <VacancyDataContainer>
          <VacancyDataContainerTitle>Remuneração</VacancyDataContainerTitle>

          {vacancy.salary && (
            <DataLine>
              <LineTitle>Salário</LineTitle>
              <p>
                {vacancy.salary} {vacancy.typeOfPayDTO.type}
              </p>
            </DataLine>
          )}

          <DataLine>
            <LineTitle>Salário a negociar</LineTitle>
            <p>{vacancy.salaryToNegotiate ? 'Sim' : 'Não'}</p>
          </DataLine>

          {vacancy.benefits && (
            <DataLine>
              <LineTitle>Benefícios para os funcionários</LineTitle>
              <p style={{ maxWidth: 458 }}>{vacancy.benefits}</p>
            </DataLine>
          )}
        </VacancyDataContainer>

        {verifyIfVacancyHasRequirements(vacancy) && (
          <VacancyDataContainer>
            <VacancyDataContainerTitle>Requisitos</VacancyDataContainerTitle>

            {vacancy.otherRequirements && (
              <DataLine>
                <p style={{ padding: '12px 0' }}>{vacancy.otherRequirements}</p>
              </DataLine>
            )}

            {vacancy.competencies && (
              <DataLine>
                <LineTitle>Competências técnicas</LineTitle>
                <RequirementsListContainer>
                  {vacancy.competencies.map(competency => (
                    <Requirement key={competency}>
                      <span>{competency}</span>
                    </Requirement>
                  ))}
                </RequirementsListContainer>
              </DataLine>
            )}

            {vacancy.skills && (
              <DataLine>
                <LineTitle>Habilidades interpessoais</LineTitle>
                <RequirementsListContainer>
                  {vacancy.skills.map(({ name, description }) => (
                    <Requirement key={name}>
                      <span>{name}</span>

                      <RequirementDescription>
                        {description}
                      </RequirementDescription>
                    </Requirement>
                  ))}
                </RequirementsListContainer>
              </DataLine>
            )}

            {vacancy.languages && (
              <DataLine>
                <LineTitle>Idiomas</LineTitle>
                <RequirementsListContainer>
                  {vacancy.languages.map(({ name, level }) => (
                    <Requirement key={name}>
                      <span>{`${name}, ${level}`}</span>
                    </Requirement>
                  ))}
                </RequirementsListContainer>
              </DataLine>
            )}

            {vacancy.certifications && (
              <DataLine>
                <LineTitle>Certificações</LineTitle>
                <RequirementsListContainer>
                  {vacancy.certifications.map(certification => (
                    <Requirement key={certification}>
                      <span>{certification}</span>
                    </Requirement>
                  ))}
                </RequirementsListContainer>
              </DataLine>
            )}
          </VacancyDataContainer>
        )}
      </MainContainer>

      <VacancyPostContainer disabled={vacancyStatus !== 'ACEITANDOCURRICULOS'}>
        {isLoadingVacancyPostColors ? (
          <Loader style={{ width: 360, height: 360, minHeight: 360 }} />
        ) : (
          <VacancyPost ref={vacancyPostRef} colors={vacancyPostColors}>
            <span>Estamos contratando...</span>
            <h1>{vacancy.name}</h1>

            <small className="vacancy-data">
              {vacancy.typeOfWorkloadDTO.type} - {vacancy.typeJobDTO.type}
            </small>
            <small className="vacancy-data">
              {vacancy.cityDTO.name}/{vacancy.cityDTO.stateDTO.name}
            </small>

            <VacancySpecificationsContainer>
              {Object.entries(VACANCY_SPECIFICATIONS).map(
                ([key, name]) =>
                  vacancy[key as keyof IFindedVacancy] && (
                    <VacancySpecification key={key}>
                      {name}
                    </VacancySpecification>
                  ),
              )}
            </VacancySpecificationsContainer>

            <LinkContainer>
              <p>Candidate-se agora em</p>
              <p id="vacancy-link">
                www.in6.com.br/{convertCamelCaseToSnakeCase(startupName)}
              </p>
            </LinkContainer>

            <MoreDetailsContainer>
              <span>mais detalhes</span>
              <BsArrowDown size={20} strokeWidth={0.7} />
            </MoreDetailsContainer>
          </VacancyPost>
        )}

        <VacancyPostDescription
          dangerouslySetInnerHTML={{
            __html: postDescription.replace('\n', '<br/>'),
          }}
        />

        <PostActionButtonsContainer>
          <SecondaryButton
            onClick={handleDownloadPostImage}
            disabled={vacancyStatus !== 'ACEITANDOCURRICULOS'}
          >
            Baixar post
          </SecondaryButton>
          <SimpleButton
            onClick={handleCopyPostText}
            disabled={vacancyStatus !== 'ACEITANDOCURRICULOS'}
          >
            Copiar legenda
          </SimpleButton>
        </PostActionButtonsContainer>
      </VacancyPostContainer>
    </>
  );
};
