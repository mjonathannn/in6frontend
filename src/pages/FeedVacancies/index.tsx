import in6vagasLogo from 'assets/img/in6vagasLogo.svg';
import historyQuery from 'assets/img/historyQuery.svg';
import closeOne from 'assets/img/closeOne.svg';
import localTwo from 'assets/img/localTwo.svg';
import search from 'assets/img/search.svg';
import immediateHiringIcon from 'assets/img/immediateHiring.svg';
import needExperienceIcon from 'assets/img/needExperience.svg';
import disabledPeopleIcon from 'assets/img/disabledPeople.svg';
import forStudentsIcon from 'assets/img/forStudents.svg';
import deleteTwo from 'assets/img/deleteTwo.svg';
import testVacancyCompanyLogo from 'assets/img/accountConfigIconWhite.svg';
import whiteArrowRight from 'assets/img/whiteArrowRight.svg';
import { Switch } from 'components/Switch';
import { Footer } from 'components/Footer';
import { Loader } from 'components/Loader';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Select, { OptionTypeBase, StylesConfig } from 'react-select';

import { useHistory } from 'react-router-dom';
import {
  routeFeedVacancies,
  routeBar,
  routeVacancyApply,
} from 'routes/routesAddresses';
import { COMPANY_NAME, COMPANY_PRODUCT_NAME_2 } from 'constants/company';
import { SecondaryButton } from 'components/Buttons';
import { GrayBackground, GrayLine, PrimaryColor } from 'assets/colors/palette';
import { IFindedVacancy } from 'types/vacancy';
import { findAllVacancies } from 'services/vacancyServices';
import { useFooter } from 'hooks/footer';
import { typeJobOptions, typeOfWorkloadOptions } from 'utils/typeOptions';
import {
  convertStringSalaryToNumber,
  formatNumberToBRCurrency,
  convertCityDTOToCityAndStateString,
} from 'utils/conversion';

import { getParsedVacancySalaryInformation } from 'utils/conversion/getParsedVacancySalaryInformation';
import {
  HeaderMainContainer,
  HeaderSubContainer,
  VacancytypeJobsContainer,
  VacancyJobButton,
  SearchVacancyContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  MainContainer,
  FiltersContainer,
  SalaryFilter,
  WorkLoadFilter,
  OtherFilters,
  VacanciesContainer,
  ClearSearchResultsButton,
  Vacancy,
  VacancyData,
  VacancyAspects,
  VacancyExtraAspects,
  RegisterNoticeContainer,
  SignUpEmailButton,
} from './styles';
import { BannerNotification } from './BannerNotification';

const parsedtypeJobOptions = [
  'Todas',
  ...typeJobOptions.map(({ label }) => label),
];

export const FeedVacancies: React.FC = () => {
  document.title = `${COMPANY_NAME} ${COMPANY_PRODUCT_NAME_2}`;
  const history = useHistory();
  const { changeFooterUpdateData } = useFooter();

  const [name, setName] = useState('');
  const nameInput = useRef<HTMLInputElement>(null);

  const [city, setCity] = useState('');
  const cityInput = useRef<HTMLInputElement>(null);

  const [findedVacancies, setFindedVacancies] = useState<IFindedVacancy[]>([]);
  const [searchedVacancies, setSearchedVacancies] = useState<IFindedVacancy[]>(
    [],
  );
  const [filteredVacancies, setFilteredVacancies] = useState<IFindedVacancy[]>(
    [],
  );

  const [selectedtypeJobOption, setSelectedtypeJobOption] = useState(0);
  const [typeOfWorkload, settypeOfWorkload] = useState(0);
  const [salaryFilterValue, setSalaryFilterValue] = useState(0);
  const [userHasSearched, setUserHasSearched] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [bannerIsVisible, setBannerIsVisible] = useState(false);

  const [immediateHiring, setImmediateHiring] = useState(false);
  const [needExperience, setNeedExperience] = useState(false);
  const [disabledPeople, setDisabledPeople] = useState(false);
  const [forStudents, setForStudents] = useState(false);

  useEffect(() => {
    changeFooterUpdateData(Number(isLoading) + filteredVacancies.length);
  }, [changeFooterUpdateData, filteredVacancies.length, isLoading]);

  const typeOfWorkloadColourStyles: StylesConfig<OptionTypeBase, false> = {
    control: styles => ({
      ...styles,
      width: 256,
      height: 48,
      borderRadius: 8,
      boxShadow: 'none',
      border: `solid 1px ${GrayLine}`,
      '&:hover': {
        border: `solid 2px ${PrimaryColor}`,
      },
      letterSpacing: 0.75,
      fontSize: 14,
      backgroundColor: GrayBackground,
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: 'black',
      backgroundColor: isFocused ? '#ffb685' : undefined,
    }),
  };

  useEffect(() => {
    findAllVacancies().then(vacancies => {
      const receivingResumesVacancies = vacancies.filter(
        ({ vacancyStatus }) => vacancyStatus === 'ACEITANDOCURRICULOS',
      );

      setFindedVacancies(receivingResumesVacancies);
      setSearchedVacancies(receivingResumesVacancies);
      setIsLoading(false);
    });
  }, []);

  const verifySearchFilters = useCallback(
    (vacancy: IFindedVacancy): boolean => {
      if (salaryFilterValue) {
        const { salary, salaryToNegotiate } = vacancy;

        const verifySalary =
          salaryToNegotiate ||
          convertStringSalaryToNumber(salary ?? '0') >= salaryFilterValue;
        if (!verifySalary) return false;
      }

      if (typeOfWorkload) {
        const verifytypeOfWorkload =
          vacancy.typeOfWorkloadDTO.id === typeOfWorkload;
        if (!verifytypeOfWorkload) return false;
      }

      const filtersArray = [
        ['immediateHiring', immediateHiring],
        ['needExperience', needExperience],
        ['disabledPeople', disabledPeople],
        ['forStudents', forStudents],
      ];

      const verifyFilters = filtersArray.findIndex(
        ([filterName, value]) =>
          value && !vacancy[filterName as keyof IFindedVacancy],
      );

      return verifyFilters === -1;
    },
    [
      disabledPeople,
      forStudents,
      immediateHiring,
      needExperience,
      salaryFilterValue,
      typeOfWorkload,
    ],
  );

  const verifySearchFields = useCallback(
    ({
      name: vacancyName,
      companyDTOOutput,
      id,
      cityDTO,
    }: IFindedVacancy): boolean => {
      if (name) {
        const lowerName = name.toLowerCase();
        const lowerVacancyName = vacancyName.toLowerCase();
        const companyName = companyDTOOutput?.name.toLowerCase();
        const parsedVacancyId = id + 1000;

        const verifyName =
          lowerVacancyName.includes(lowerName) ||
          companyName?.includes(lowerName) ||
          parsedVacancyId === Number(name);
        if (!verifyName) return false;
      }

      if (city) {
        const cityName = cityDTO.name.toLowerCase();
        const verifyCity = cityName.includes(city.toLowerCase());
        if (!verifyCity) return false;
      }

      return true;
    },
    [city, name],
  );

  const gettypeJobVacancies = useCallback(() => {
    const getFilteredVacanciesBytypeJob = () => {
      return findedVacancies.filter(
        vacancy =>
          vacancy.typeJobDTO.type ===
          parsedtypeJobOptions[selectedtypeJobOption],
      );
    };

    return selectedtypeJobOption === 0
      ? findedVacancies
      : getFilteredVacanciesBytypeJob();
  }, [findedVacancies, selectedtypeJobOption]);

  const handleSearchVacancies = useCallback(
    (fieldSearch?: boolean) => {
      const typeJobVacancies = gettypeJobVacancies();

      setSearchedVacancies(
        typeJobVacancies.filter(vacancy => verifySearchFields(vacancy)),
      );
      if (fieldSearch !== undefined) setUserHasSearched(fieldSearch);
    },
    [gettypeJobVacancies, verifySearchFields],
  );

  useEffect(() => {
    handleSearchVacancies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gettypeJobVacancies, selectedtypeJobOption]);

  useEffect(() => {
    setFilteredVacancies(
      searchedVacancies.filter(vacancy => verifySearchFilters(vacancy)),
    );
  }, [searchedVacancies, verifySearchFilters]);

  return (
    <>
      {bannerIsVisible && (
        <BannerNotification closeModal={() => setBannerIsVisible(false)} />
      )}

      <HeaderMainContainer>
        <HeaderSubContainer>
          <button
            type="button"
            onClick={() => history.push(routeFeedVacancies)}
          >
            <img src={in6vagasLogo} alt="in6vagasLogo" />
          </button>

          <SecondaryButton
            type="button"
            className="secondaryButton"
            onClick={() => history.push(routeBar)}
          >
            Criar nova vaga
          </SecondaryButton>
        </HeaderSubContainer>
      </HeaderMainContainer>

      <VacancytypeJobsContainer>
        {parsedtypeJobOptions.map((typeJobOption, index) => (
          <VacancyJobButton
            type="button"
            key={typeJobOption}
            isActivated={index === selectedtypeJobOption}
            onClick={() => setSelectedtypeJobOption(index)}
          >
            {typeJobOption}
          </VacancyJobButton>
        ))}
      </VacancytypeJobsContainer>

      <SearchVacancyContainer>
        <div className="title">
          <h1>Encontre o trabalho que você precisa</h1>
          <p>Descubra as vagas que estão mais próximas de você</p>
        </div>

        <SearchContainer>
          <SearchInput onClick={() => nameInput.current?.focus()}>
            <img src={historyQuery} alt="" />
            <input
              ref={nameInput}
              placeholder="Nome da vaga ou empresa"
              type="text"
              onKeyPress={({ code }) =>
                code === 'Enter' && handleSearchVacancies(!!name || !!city)
              }
              value={name}
              onChange={({ target: { value } }) => setName(value)}
            />

            {name && (
              <button type="button" onClick={() => setName('')}>
                <img src={closeOne} alt="" />
              </button>
            )}
          </SearchInput>

          <SearchInput onClick={() => cityInput.current?.focus()}>
            <img src={localTwo} alt="" />
            <input
              ref={cityInput}
              placeholder="Nome da cidade"
              type="text"
              onKeyPress={({ code }) =>
                code === 'Enter' && handleSearchVacancies(!!name || !!city)
              }
              value={city}
              onChange={({ target: { value } }) => setCity(value)}
            />

            {city && (
              <button type="button" onClick={() => setCity('')}>
                <img src={closeOne} alt="" />
              </button>
            )}
          </SearchInput>

          <SearchButton
            type="button"
            onClick={() => handleSearchVacancies(!!name || !!city)}
          >
            <img src={search} alt="" />
          </SearchButton>
        </SearchContainer>
      </SearchVacancyContainer>

      <MainContainer>
        <FiltersContainer>
          <p className="container-name">Pesquisa avançada</p>

          <SalaryFilter barPercentage={salaryFilterValue / 200}>
            <p className="subcontainer-name">Remuneração mínima</p>
            <div className="value-container">
              <p>R$ {formatNumberToBRCurrency(salaryFilterValue)}</p>
            </div>
            <input
              type="range"
              step={500}
              min="0"
              max="20000"
              value={salaryFilterValue}
              onChange={({ target: { value } }) =>
                setSalaryFilterValue(Number(value))
              }
            />
          </SalaryFilter>

          <WorkLoadFilter>
            <p className="subcontainer-name">Carga horária</p>
            <Select
              styles={typeOfWorkloadColourStyles}
              options={[{ id: 0, label: 'Todas' }, ...typeOfWorkloadOptions]}
              placeholder="selecionar"
              onChange={ev => settypeOfWorkload(ev?.id)}
            />
          </WorkLoadFilter>

          <OtherFilters>
            <Switch
              name="Contratação imediata"
              state={[immediateHiring, setImmediateHiring]}
            />
            <Switch
              name="Requer experiência"
              state={[needExperience, setNeedExperience]}
            />
            <Switch
              name="Para PcD"
              state={[disabledPeople, setDisabledPeople]}
            />
            <Switch
              name="Para estudantes"
              state={[forStudents, setForStudents]}
            />
          </OtherFilters>
        </FiltersContainer>

        <VacanciesContainer>
          {userHasSearched && (
            <ClearSearchResultsButton
              type="button"
              onClick={() => {
                setName('');
                setCity('');
                setUserHasSearched(false);

                if (selectedtypeJobOption === 0) {
                  setSearchedVacancies(findedVacancies);
                } else setSelectedtypeJobOption(0);
              }}
            >
              <img src={deleteTwo} alt="" />
              <p>Limpar resultados da pesquisa</p>
            </ClearSearchResultsButton>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            filteredVacancies.map(vacancy => (
              <Vacancy
                key={vacancy.id}
                to={`${routeVacancyApply}/${1000 + vacancy.id}`}
                target="_blank"
              >
                <VacancyData>
                  <div className="company-data">
                    <img src={testVacancyCompanyLogo} alt="" />

                    <div>
                      <p className="company-name">
                        {vacancy.companyDTOOutput?.name}
                      </p>
                      <small className="company-location">
                        {convertCityDTOToCityAndStateString(vacancy)}
                      </small>
                    </div>
                  </div>

                  <small className="vacancy-date">Nova</small>
                </VacancyData>

                <p className="vacancy-title">{vacancy.name}</p>

                <VacancyAspects>
                  <p>{vacancy.typeJobDTO.type}</p>
                  <p>{vacancy.typeOfWorkloadDTO.type}</p>
                  <p>{getParsedVacancySalaryInformation(vacancy)}</p>
                </VacancyAspects>

                <VacancyExtraAspects>
                  {vacancy.immediateHiring && (
                    <i title="Contratação imediata">
                      <img
                        src={immediateHiringIcon}
                        alt="Contratação imediata"
                      />
                    </i>
                  )}
                  {vacancy.needExperience && (
                    <i title="Requer experiência">
                      <img src={needExperienceIcon} alt="Requer experiência" />
                    </i>
                  )}
                  {vacancy.forStudents && (
                    <i title="Para estudantes">
                      <img src={forStudentsIcon} alt="Para estudantes" />
                    </i>
                  )}
                  {vacancy.disabledPeople && (
                    <i title="Para pessoas com deficiência">
                      <img
                        src={disabledPeopleIcon}
                        alt="Para pessoas com deficiência"
                      />
                    </i>
                  )}
                </VacancyExtraAspects>
              </Vacancy>
            ))
          )}
        </VacanciesContainer>

        <RegisterNoticeContainer>
          <p className="title">Seja avisado quando surgir novas vagas!</p>
          <p className="description">
            Inscreva-se para receber notificações em seu email quando surgirem
            novas vagas do seu interesse.
          </p>

          <SignUpEmailButton onClick={() => setBannerIsVisible(true)}>
            <p>Inscrever-se</p>
            <img src={whiteArrowRight} alt="" />
          </SignUpEmailButton>
        </RegisterNoticeContainer>
      </MainContainer>

      <Footer contentWidth="1272px" />
    </>
  );
};
