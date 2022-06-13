import wavingHand from 'assets/img/wavingHand.svg';
import search from 'assets/img/search.svg';
import redirectIcon from 'assets/img/redirectIcon.svg';
import shareIcon from 'assets/img/shareIcon.svg';
import candidateIcon from 'assets/img/candidateIcon.svg';
import deleteIcon from 'assets/img/deleteIcon.svg';
import noVacanciesIcon from 'assets/img/noVacanciesIcon.svg';

import { PlusButton } from 'components/Buttons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useStartup } from 'hooks/startup';
import { IFindedVacancy } from 'types/vacancy';
import { findAllVacanciesByCompany } from 'services/vacancyServices';
import { useFooter } from 'hooks/footer';
import { Loader } from 'components/Loader';
import { Link, useHistory } from 'react-router-dom';
import {
  routeCreateVacancy,
  routeVacancyDetails,
} from 'routes/startupsRoutes/startupsRoutesAddresses';

import {
  VacancyStatusPropsKeysType,
  VACANCY_STATUS_PROPS,
} from 'utils/typeOptions';
import { convertCityDTOToCityAndStateString } from 'utils/conversion';

import { routeVacancyApply } from 'routes/routesAddresses';
import { getParsedVacancySalaryInformation } from 'utils/conversion/getParsedVacancySalaryInformation';
import {
  Container,
  Header,
  CompanyMessageContainer,
  VacanciesActionsContainer,
  SearchVacanciesInput,
  Main,
  VacanciesContainer,
  VacanciesContainerStatus,
  VacancyContainer,
  Vacancy,
  VacancyAspects,
  BottomContainer,
  VacancyCurrentSituation,
  SituationContainer,
  NoVacanciesContainer,
} from './styles';

interface OrderedVacancies {
  openVacancies: IFindedVacancy[];
  pausedVacancies: IFindedVacancy[];
  closedVacancies: IFindedVacancy[];
}

export const StartupVacanciesTab: React.FC = () => {
  const history = useHistory();
  const { startupData } = useStartup();
  const { changeFooterUpdateData } = useFooter();
  const searchVacanciesInputRef = useRef<HTMLInputElement>(null);

  const [isLoadingVacancies, setIsLoadingVacancies] = useState(true);
  const [searchedVacancyText, setSearchedVacancyText] = useState('');
  const [startupVacancies, setStartupVacancies] = useState<IFindedVacancy[]>(
    [],
  );
  const [searchedVacancies, setSearchedVacancies] = useState<IFindedVacancy[]>(
    [],
  );

  useEffect(() => {
    changeFooterUpdateData(searchedVacancies.length);
  }, [changeFooterUpdateData, searchedVacancies.length]);

  useEffect(() => {
    findAllVacanciesByCompany(localStorage.getItem('email') ?? '').then(
      findedVacancies => {
        setStartupVacancies(findedVacancies);
        setIsLoadingVacancies(false);
      },
    );
  }, []);

  useEffect(() => {
    setSearchedVacancies(
      startupVacancies.filter(({ name }) =>
        name.toLowerCase().includes(searchedVacancyText),
      ),
    );
  }, [searchedVacancyText, startupVacancies]);

  const vacanciesOrderedByStatus: OrderedVacancies = useMemo(() => {
    const openVacancies: IFindedVacancy[] = [];
    const pausedVacancies: IFindedVacancy[] = [];
    const closedVacancies: IFindedVacancy[] = [];

    const getSelectedArray = (vacancyStatus: string) => {
      switch (vacancyStatus) {
        case 'ACEITANDOCURRICULOS':
          return openVacancies;
        case 'NAOACEITANDOCURRICULOS':
          return pausedVacancies;
        case 'VAGAENCERRADA':
          return closedVacancies;
        default:
          return null;
      }
    };

    searchedVacancies.forEach(searchedVacancy => {
      const selectedArray = getSelectedArray(searchedVacancy.vacancyStatus);
      if (selectedArray) selectedArray.push(searchedVacancy);
    });

    return {
      openVacancies,
      pausedVacancies,
      closedVacancies,
    };
  }, [searchedVacancies]);

  return (
    <Container>
      <Header>
        <CompanyMessageContainer>
          <div className="welcome-message">
            <h3>Olá, {startupData.name}</h3>
            <img src={wavingHand} alt="Mão acenando" />
          </div>

          <span>Crie e gerencie as vagas da sua startup</span>
        </CompanyMessageContainer>

        <VacanciesActionsContainer>
          <SearchVacanciesInput
            disabled={startupVacancies.length === 0}
            onClick={() =>
              startupVacancies.length > 0 &&
              searchVacanciesInputRef.current?.focus()
            }
          >
            <input
              ref={searchVacanciesInputRef}
              type="text"
              placeholder="Encontrar vaga"
              disabled={startupVacancies.length === 0}
              onChange={({ target: { value } }) =>
                setSearchedVacancyText(value.toLowerCase())
              }
            />
            <img src={search} alt="Lupa" />
          </SearchVacanciesInput>

          <PlusButton
            onClick={() => history.push(routeCreateVacancy)}
            colorStyle="fill"
          >
            Criar vaga
          </PlusButton>
        </VacanciesActionsContainer>
      </Header>

      {isLoadingVacancies ? (
        <Loader />
      ) : (
        <Main>
          {startupVacancies.length === 0 ? (
            <NoVacanciesContainer>
              <img src={noVacanciesIcon} alt="" />
              <p>
                Você não tem nenhuma vaga cadastrada. Clique em “Nova vaga” e
                aproveite todos os recursos que a IN6 pode oferecer!
              </p>
            </NoVacanciesContainer>
          ) : (
            Object.entries(vacanciesOrderedByStatus).map(
              ([key, statusVacancies]) =>
                statusVacancies.length !== 0 && (
                  <VacanciesContainer
                    key={key}
                    colors={
                      VACANCY_STATUS_PROPS[key as VacancyStatusPropsKeysType]
                        .colors
                    }
                  >
                    <VacanciesContainerStatus>
                      {
                        VACANCY_STATUS_PROPS[key as VacancyStatusPropsKeysType]
                          .name
                      }
                    </VacanciesContainerStatus>

                    {(statusVacancies as IFindedVacancy[]).map(
                      statusVacancy => (
                        <VacancyContainer key={statusVacancy.id}>
                          <Vacancy
                            type="button"
                            onClick={() =>
                              history.push(routeVacancyDetails, statusVacancy)
                            }
                          >
                            <span className="vacancy-name">
                              {statusVacancy.name}
                            </span>
                            <span className="vacancy-location">
                              {convertCityDTOToCityAndStateString(
                                statusVacancy,
                              )}
                            </span>

                            <VacancyAspects>
                              <p>{statusVacancy.typeJobDTO.type}</p>
                              <p>{statusVacancy.typeOfWorkloadDTO.type}</p>
                              <p>
                                {getParsedVacancySalaryInformation(
                                  statusVacancy,
                                )}
                              </p>
                            </VacancyAspects>

                            <BottomContainer>
                              <VacancyCurrentSituation>
                                <SituationContainer>
                                  Encerra em 30 dias
                                </SituationContainer>

                                <SituationContainer>
                                  <img src={candidateIcon} alt="Candidato" />9
                                </SituationContainer>
                              </VacancyCurrentSituation>
                            </BottomContainer>
                          </Vacancy>

                          {key === 'closedVacancies' ? (
                            <button type="button" className="action-button">
                              <img src={deleteIcon} alt="Excluir" />
                            </button>
                          ) : (
                            <>
                              <button type="button" className="action-button">
                                <img src={shareIcon} alt="Compartilhar" />
                              </button>

                              <Link
                                to={`${routeVacancyApply}/${
                                  1000 + statusVacancy.id
                                }`}
                                target="_blank"
                                className="action-button"
                              >
                                <img src={redirectIcon} alt="Redirecionar" />
                              </Link>
                            </>
                          )}
                        </VacancyContainer>
                      ),
                    )}
                  </VacanciesContainer>
                ),
            )
          )}
        </Main>
      )}
    </Container>
  );
};
