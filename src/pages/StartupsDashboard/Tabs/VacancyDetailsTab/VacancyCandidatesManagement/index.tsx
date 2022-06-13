import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import searchIcon from 'assets/img/search.svg';
import filterIcon from 'assets/img/filter.svg';
import positiveAssessmentIcon from 'assets/img/positiveAssessment.svg';
import negativeAssessmentIcon from 'assets/img/negativeAssessment.svg';
import whatsappIcon from 'assets/img/whatsapp.svg';
import { developingAlert } from 'utils';
import { ICandidate } from 'types';
import { findAllCandidates } from 'services/candidatesServices';
import { PrimaryButton } from 'components/Buttons';
import { Loader } from 'components/Loader';
import { useFooter } from 'hooks/footer';

import { convertCityDTOToCityAndStateString } from 'utils/conversion';
import { IFindedVacancy } from 'types/vacancy';
import {
  CandidatesSearch,
  SearchContainer,
  FilterButton,
  SearchBar,
  SearchFiltersContainer,
  ColumnNamesContainer,
  Candidate,
  CandidateButton,
  CandidateNameAndIcon,
  CandidateLocation,
  CandidateAssessment,
  SelectedCandidate,
  SelectedCandidateName,
  SelectedCandidateOccupation,
  ButtonsContainer,
  WhatsappButton,
  ContactLine,
  InformationName,
  CandidateInformation,
  AssessmentButtonsContainer,
  AssessmentButton,
} from './styles';
import { OptionsButton } from './OptionsButton';
import { SearchFilterColumn } from './SearchFilterColumn';

interface VacancyCandidatesManagementProps {
  vacancy: IFindedVacancy;
}

const contactDataObject = {
  city: 'Cidade',
  email: 'Email',
  whatsapp: 'WhatsApp',
  phone: 'Telefone',
};

const assessmentArray = [
  {
    id: 0,
    label: 'Não efetuada',
  },
  {
    id: 1,
    label: 'Positiva',
  },
  {
    id: 2,
    label: 'Negativa',
  },
];

export const VacancyCandidatesManagement: React.FC<
  VacancyCandidatesManagementProps
> = ({ vacancy: { id: vacancyId } }) => {
  const { changeFooterUpdateData } = useFooter();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchedText, setSearchedText] = useState('');

  // This state will be removed when this information get implemented on backend.
  const [temporaryActiveButton, setTemporaryActiveButton] = useState<
    'positive' | 'negative' | null
  >(null);
  const [isSearchFilterContainerVisible, setIsSearchFilterContainerVisible] =
    useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<ICandidate | null>(
    null,
  );
  const [vacancyCandidates, setVacancyCandidates] = useState<ICandidate[]>([]);
  const [searchedCandidates, setSearchedCandidates] = useState<ICandidate[]>(
    [],
  );

  const [filteredCities, setFilteredCities] = useState<number[]>([]);
  const [filteredAssessment, setFilteredAssessment] = useState<number[]>([
    0, 1, 2,
  ]);

  useEffect(() => {
    changeFooterUpdateData(Number(isLoading) + searchedCandidates.length);
  }, [changeFooterUpdateData, isLoading, searchedCandidates.length]);

  useEffect(() => {
    // findAllCandidatesByVacancy(vacancyId)
    findAllCandidates().then(data => {
      if (data) {
        setVacancyCandidates(data);
        setSearchedCandidates(data);
      }

      setIsLoading(false);
    });
  }, [vacancyId]);

  const verifySearchFilters = useCallback(
    (candidate: ICandidate): boolean => {
      if (!candidate.name.toLowerCase().includes(searchedText)) {
        return false;
      }

      if (!filteredCities.includes(candidate.cityDTO.id)) {
        return false;
      }

      // 0 will be replaced by candidate assessment.
      if (!filteredAssessment.includes(0)) {
        return false;
      }

      return true;
    },
    [filteredAssessment, filteredCities, searchedText],
  );

  useEffect(() => {
    setSearchedCandidates(
      vacancyCandidates.filter(candidate => verifySearchFilters(candidate)),
    );
    setSelectedCandidate(null);
  }, [vacancyCandidates, verifySearchFilters]);

  const handleHideSearchFilterContainer = useCallback(() => {
    setIsSearchFilterContainerVisible(false);
  }, []);

  useEffect(() => {
    if (isSearchFilterContainerVisible)
      document.addEventListener('click', handleHideSearchFilterContainer);
    else document.removeEventListener('click', handleHideSearchFilterContainer);
  }, [isSearchFilterContainerVisible, handleHideSearchFilterContainer]);

  const candidatesCities = useMemo(() => {
    const citiesArray = vacancyCandidates.map(({ cityDTO }) => cityDTO);

    const citiesWithoutRepetitions = citiesArray.filter(
      ({ id }, index, arr) =>
        index === arr.findIndex(({ id: findedId }) => findedId === id),
    );

    const parsedCities = citiesWithoutRepetitions.map(city => ({
      id: city.id,
      label: `${city.name}, ${city.stateDTO.name}`,
    }));

    setFilteredCities(parsedCities.map(({ id }) => id));

    return parsedCities;
  }, [vacancyCandidates]);

  const updateCitiesFilter = useCallback(
    (cityId: number, toRemove: boolean) => {
      let setFunction: (citiesIds: number[]) => number[];

      if (!toRemove) setFunction = citiesIds => [...citiesIds, cityId];
      else setFunction = citiesIds => citiesIds.filter(id => id !== cityId);

      setFilteredCities(setFunction);
    },
    [],
  );

  const updateAssessmentFilter = useCallback(
    (assessmentId: number, toRemove: boolean) => {
      let setFunction: (assessmentIds: number[]) => number[];

      if (!toRemove)
        setFunction = assessmentIds => [...assessmentIds, assessmentId];
      else {
        setFunction = assessmentIds =>
          assessmentIds.filter(id => id !== assessmentId);
      }

      setFilteredAssessment(setFunction);
    },
    [],
  );

  const handleDeleteCandidate = useCallback((candidateId: number) => {
    if (candidateId) developingAlert();
  }, []);

  return (
    <>
      <CandidatesSearch>
        <SearchContainer>
          <SearchBar onClick={() => searchInputRef.current?.focus()}>
            <img src={searchIcon} alt="Lupa de busca" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Encontrar candidato"
              onChange={({ target: { value } }) =>
                setSearchedText(value.toLowerCase())
              }
            />
          </SearchBar>

          <FilterButton
            type="button"
            onClick={() => setIsSearchFilterContainerVisible(value => !value)}
          >
            <img src={filterIcon} alt="Funil" />
          </FilterButton>

          <SearchFiltersContainer
            isVisible={isSearchFilterContainerVisible}
            onClick={event => event.stopPropagation()}
          >
            <SearchFilterColumn
              columnTitle="Avaliação"
              updateFilterOptionValue={updateAssessmentFilter}
              searchFilterOptions={assessmentArray}
            />
            <SearchFilterColumn
              columnTitle="Cidade"
              updateFilterOptionValue={updateCitiesFilter}
              searchFilterOptions={candidatesCities}
            />
          </SearchFiltersContainer>
        </SearchContainer>

        <ColumnNamesContainer>
          <span>Candidatos</span>
          <span>Cidade</span>
          <span>Avaliação</span>
        </ColumnNamesContainer>

        {isLoading ? (
          <Loader style={{ minHeight: 'auto' }} />
        ) : (
          searchedCandidates.map(candidate => (
            <Candidate key={candidate.id}>
              <CandidateButton
                type="button"
                onClick={() => setSelectedCandidate(candidate)}
                isSelected={candidate.id === selectedCandidate?.id}
              >
                <CandidateNameAndIcon>
                  <div className="icon">
                    {candidate.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{candidate.name}</span>
                </CandidateNameAndIcon>

                <CandidateLocation>
                  {convertCityDTOToCityAndStateString(candidate)}
                </CandidateLocation>

                <CandidateAssessment background="#EAFFE9">
                  <span>Avaliar</span>
                  {/* <div>
              <img src={positiveAssessmentIcon} alt="" />
            </div> */}
                  {/* <i>
              <img src={negativeAssessmentIcon} alt="" />
            </i> */}
                </CandidateAssessment>
              </CandidateButton>

              <OptionsButton
                handleDeleteCandidate={() =>
                  handleDeleteCandidate(candidate.id)
                }
              />
            </Candidate>
          ))
        )}
      </CandidatesSearch>

      <SelectedCandidate>
        {selectedCandidate && (
          <>
            <SelectedCandidateName>
              {`${selectedCandidate.name} ${selectedCandidate.lastName}`}
            </SelectedCandidateName>

            <SelectedCandidateOccupation>
              {selectedCandidate.occupation}
            </SelectedCandidateOccupation>

            <ButtonsContainer>
              <PrimaryButton>Currículo</PrimaryButton>
              <WhatsappButton type="button">
                <img src={whatsappIcon} alt="Whatsapp" />
              </WhatsappButton>
            </ButtonsContainer>

            <div>
              {Object.entries(contactDataObject).map(([key, value]) => (
                <ContactLine key={key}>
                  <InformationName>{value}</InformationName>
                  <CandidateInformation>
                    {key === 'city'
                      ? convertCityDTOToCityAndStateString(selectedCandidate)
                      : selectedCandidate[key as keyof ICandidate]}
                  </CandidateInformation>
                </ContactLine>
              ))}
            </div>

            <AssessmentButtonsContainer>
              <AssessmentButton
                type="button"
                assessmentType="positive"
                onClick={() => setTemporaryActiveButton('positive')}
                active={temporaryActiveButton === 'positive'}
              >
                <img src={positiveAssessmentIcon} alt="Gostei" />
                <span>Gostei</span>
              </AssessmentButton>

              <AssessmentButton
                type="button"
                assessmentType="negative"
                onClick={() => setTemporaryActiveButton('negative')}
                active={temporaryActiveButton === 'negative'}
              >
                <img src={negativeAssessmentIcon} alt="Não gostei" />
                <span>Não gostei</span>
              </AssessmentButton>
            </AssessmentButtonsContainer>
          </>
        )}
      </SelectedCandidate>
    </>
  );
};
