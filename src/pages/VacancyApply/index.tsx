/* eslint-disable react-hooks/rules-of-hooks */
import { Header } from 'components/Header';
import immediateHiringIcon from 'assets/img/immediateHiring.svg';
import needExperienceIcon from 'assets/img/needExperience.svg';
import disabledPeopleIcon from 'assets/img/disabledPeople.svg';
import forStudentsIcon from 'assets/img/forStudents.svg';
import testVacancyCompanyLogo from 'assets/img/accountConfigIconWhite.svg';
import localTwo from 'assets/img/localTwo.svg';
import cooperativeHandshake from 'assets/img/cooperativeHandshake.svg';
import time from 'assets/img/time.svg';
import dollar from 'assets/img/dollar.svg';
import hexagonStrip from 'assets/img/hexagonStrip.svg';
import uploadThree from 'assets/img/uploadThree.svg';
import { Footer } from 'components/Footer';
import { handleFormError } from 'errors/handleFormError';
import { Input } from 'components/Input';
import { InputWithIcon } from 'components/Input/InputWithIcon';
import { Terms } from 'components/Terms';
import * as yup from 'yup';

import { Redirect, useHistory, useParams } from 'react-router-dom';
import { routeFeedVacancies } from 'routes/routesAddresses';
import { cpfPattern, phonePattern, ICandidate } from 'types';
import { useCallback, useEffect, useState } from 'react';
import { PrimaryButton } from 'components/Buttons';
import { findOneVacancy } from 'services/vacancyServices';
import { Loader } from 'components/Loader';
import { Select } from 'components/Select';
import { findAllCitiesByState } from 'services/cityServices';
import { OptionTypeBase } from 'react-select';

import { createCandidate } from 'services/candidatesServices';
import { useFooter } from 'hooks/footer';
import { GenerateInputStates, generateFormObjectFromStates } from 'utils';

import { yupRequiredStringField } from 'utils/validation';
import { stateOptions } from 'utils/typeOptions';
import { IFindedVacancy } from 'types/vacancy';
import { getParsedVacancySalaryInformation } from 'utils/conversion/getParsedVacancySalaryInformation';
import { verifyIfVacancyHasRequirements } from 'utils/verifyIfVacancyHasRequirements';
import { vacancyRequirementsExample } from 'utils/vacancyRequirementsExample';
import {
  Container,
  VacancyContainer,
  TopContainer,
  TitleContainer,
  VacancyAspects,
  VacancyData,
  VacancyDataLine,
  VacancyTopic,
  ApplyContainer,
  RequirementContainer,
  Requirement,
  RequirementWithDescription,
} from './styles';

export const VacancyApply: React.FC = () => {
  const { vacancyId } = useParams() as { vacancyId: string };
  if (!vacancyId) return <Redirect to={routeFeedVacancies} />;

  const history = useHistory();
  const { changeFooterUpdateData } = useFooter();

  const [vacancy, setVacancy] = useState<IFindedVacancy>({} as IFindedVacancy);
  const [isLoading, setIsLoading] = useState(true);

  const [cities, setCities] = useState<OptionTypeBase[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  const nameStates = GenerateInputStates('name');
  const lastNameStates = GenerateInputStates('lastName');
  const cpfStates = GenerateInputStates('cpf');
  const occupationStates = GenerateInputStates('occupation');
  const cityStates = GenerateInputStates('city');
  const stateStates = GenerateInputStates('state');
  const emailStates = GenerateInputStates('email');
  const whatsappStates = GenerateInputStates('whatsapp');
  const phoneStates = GenerateInputStates('phone');
  const resumeStates = GenerateInputStates('resume', {} as File);
  const inputStyles = { fontSize: 16, height: 48 };

  useEffect(() => {
    changeFooterUpdateData(isLoading);
  }, [changeFooterUpdateData, isLoading]);

  useEffect(() => {
    findOneVacancy(Number(vacancyId) - 1000).then(findedVacancy => {
      if (findedVacancy) {
        setVacancy({ ...findedVacancy, ...vacancyRequirementsExample });
        document.title = `${findedVacancy.companyDTOOutput?.name} | ${findedVacancy.name}`;
      }

      setIsLoading(false);
    });
  }, [vacancyId]);

  useEffect(() => {
    const { value: stateValue } = stateStates.mainState;

    if (stateValue) {
      findAllCitiesByState(Number(stateValue)).then(findedCities => {
        setCities(findedCities.map(({ id, name: label }) => ({ id, label })));
        cityStates.mainState.setFunction(findedCities[0].id.toString());
        setIsLoadingCities(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityStates.mainState.setFunction, stateStates.mainState.value]);

  const handleSubmit = useCallback(async () => {
    const formStates = [
      nameStates,
      lastNameStates,
      cpfStates,
      occupationStates,
      emailStates,
      whatsappStates,
      phoneStates,
      resumeStates,
    ];
    const formObject = generateFormObjectFromStates(formStates);

    try {
      const schema = yup.object().shape({
        name: yupRequiredStringField,
        lastName: yupRequiredStringField,
        cpf: yupRequiredStringField.length(
          14,
          'CPF inválido, formato correto: 999.999.999-99',
        ),
        occupation: yupRequiredStringField,
        email: yupRequiredStringField.email('Formato de e-mail incorreto'),
        whatsapp: yupRequiredStringField.length(
          15,
          'Número inválido, formato correto: (99)9.9999-9999',
        ),
        phone: yupRequiredStringField.length(
          15,
          'Número inválido, formato correto: (99)9.9999-9999',
        ),
        resume: yup
          .mixed()
          .test('required', 'PDF obrigatório', value => !!value.name),
      });

      await schema.validate(formObject, { abortEarly: false });

      const requestObject = {
        ...formObject,
        cityDTO: {
          id: Number(cityStates.mainState.value),
          stateDTO: {
            id: Number(stateStates.mainState.value),
          },
        },
      } as ICandidate;

      await createCandidate(requestObject, vacancy.id);
      alert('Cadastro concluído!');

      history.push(routeFeedVacancies);
    } catch (error) {
      handleFormError(error as Error | yup.ValidationError, formStates);
    }
  }, [
    nameStates,
    lastNameStates,
    cpfStates,
    occupationStates,
    emailStates,
    whatsappStates,
    phoneStates,
    resumeStates,
    cityStates.mainState.value,
    stateStates.mainState.value,
    vacancy.id,
    history,
  ]);

  if (!isLoading && !vacancy.id) return <Redirect to={routeFeedVacancies} />;

  return (
    <>
      <Header logoType="vagas" redirectRoute={routeFeedVacancies} />

      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <VacancyContainer>
            <TopContainer>
              <img src={testVacancyCompanyLogo} alt="Logo" />

              <aside>
                <p>Publicada há 1 dia</p>
                <p>Cód. {1000 + vacancy.id}</p>
              </aside>
            </TopContainer>

            <TitleContainer>
              <h2 className="vacancyTitle">{vacancy.name}</h2>
              <h3 className="companyName">{vacancy.companyDTOOutput?.name}</h3>
            </TitleContainer>

            <VacancyAspects>
              {vacancy.immediateHiring && (
                <div>
                  <img src={immediateHiringIcon} alt="Contratação imediata" />
                  <small>Contratação imediata</small>
                </div>
              )}
              {vacancy.needExperience && (
                <div>
                  <img src={needExperienceIcon} alt="Requer experiência" />
                  <small>Requer experiência</small>
                </div>
              )}
              {vacancy.forStudents && (
                <div>
                  <img src={forStudentsIcon} alt="Para estudantes" />
                  <small>Para estudantes</small>
                </div>
              )}
              {vacancy.disabledPeople && (
                <div>
                  <img src={disabledPeopleIcon} alt="Pessoas com deficiência" />
                  <small>PcD</small>
                </div>
              )}
            </VacancyAspects>

            <VacancyData>
              <VacancyDataLine>
                <img src={localTwo} alt="Localização" />
                <p>
                  {vacancy.cityDTO.name}, {vacancy.cityDTO.stateDTO.name}
                </p>
              </VacancyDataLine>

              <VacancyDataLine>
                <img src={cooperativeHandshake} alt="Aperto de mãos" />
                <p>{vacancy.typeJobDTO.type}</p>
              </VacancyDataLine>

              <VacancyDataLine>
                <img src={time} alt="Relógio" />
                <p>{vacancy.typeOfWorkloadDTO.type}</p>
                <p>{vacancy.workSchedule}</p>
              </VacancyDataLine>

              <VacancyDataLine>
                <img src={dollar} alt="Dólar" />
                <p>{getParsedVacancySalaryInformation(vacancy)}</p>
              </VacancyDataLine>

              <VacancyDataLine>
                <img src={hexagonStrip} alt="Hexágono" />
                <p>{vacancy.benefits}</p>
              </VacancyDataLine>
            </VacancyData>

            <VacancyTopic>
              <h3 className="topic-title">Descrição da vaga</h3>
              <p className="content">{vacancy.description}</p>
            </VacancyTopic>

            {verifyIfVacancyHasRequirements(vacancy) && (
              <VacancyTopic>
                <h3 className="topic-title">Requisitos</h3>
                <p className="content">{vacancy.otherRequirements}</p>
              </VacancyTopic>
            )}

            {vacancy.competencies && (
              <RequirementContainer>
                <span>Competências técnicas</span>

                <div>
                  {vacancy.competencies.map(competency => (
                    <Requirement key={competency}>{competency}</Requirement>
                  ))}
                </div>
              </RequirementContainer>
            )}

            {vacancy.skills && (
              <RequirementContainer>
                <span>Habilidades comportamentais</span>

                <div>
                  {vacancy.skills.map(({ name, description }) => (
                    <RequirementWithDescription key={name}>
                      <Requirement>{name}</Requirement>
                      <p>{description}</p>
                    </RequirementWithDescription>
                  ))}
                </div>
              </RequirementContainer>
            )}

            {vacancy.languages && (
              <RequirementContainer>
                <span>Idiomas</span>

                <div>
                  {vacancy.languages.map(({ name, level }) => (
                    <Requirement key={name}>
                      {name}, {level}
                    </Requirement>
                  ))}
                </div>
              </RequirementContainer>
            )}

            {vacancy.certifications && (
              <RequirementContainer>
                <span>Certificações</span>

                <div>
                  {vacancy.certifications.map(certification => (
                    <Requirement key={certification}>
                      {certification}
                    </Requirement>
                  ))}
                </div>
              </RequirementContainer>
            )}

            <VacancyTopic>
              <h3 className="topic-title">
                Sobre a {vacancy.companyDTOOutput?.name}
              </h3>
              <p className="content">{vacancy.companyDTOOutput?.about}</p>
            </VacancyTopic>
          </VacancyContainer>

          <ApplyContainer>
            <h2 className="form-title">Candidatar-se agora</h2>

            <Input
              name="Primeiro nome"
              placeholder="inserir primeiro nome"
              states={nameStates}
              style={inputStyles}
            />
            <Input
              name="Sobrenome"
              placeholder="inserir sobrenome"
              states={lastNameStates}
              style={inputStyles}
            />
            <Input
              name="CPF"
              placeholder="inserir CPF"
              states={cpfStates}
              style={inputStyles}
              valuePattern={cpfPattern}
            />
            <Input
              name="Profissão"
              placeholder="inserir profissão"
              states={occupationStates}
              style={inputStyles}
            />
            <Select
              name="Estado"
              style={inputStyles}
              placeholder="Estado onde mora"
              states={stateStates}
              selectOptions={stateOptions}
              onChange={() => setIsLoadingCities(true)}
            />
            <Select
              name="Cidade"
              style={inputStyles}
              disabled={isLoadingCities}
              placeholder="Cidade onde mora"
              states={cityStates}
              selectOptions={cities}
            />
            <Input
              name="Email"
              type="email"
              placeholder="inserir email"
              states={emailStates}
              style={inputStyles}
            />
            <Input
              name="Número do WhatsApp"
              placeholder="inserir número do WhatsApp"
              states={whatsappStates}
              style={inputStyles}
              valuePattern={phonePattern}
            />
            <Input
              name="Número de telefone"
              placeholder="inserir número de telefone"
              states={phoneStates}
              style={inputStyles}
              valuePattern={phonePattern}
            />
            <InputWithIcon
              name="Currículo"
              placeholder="insira seu currículo"
              style={{ ...inputStyles, fontWeight: 500 }}
              states={resumeStates}
              type="file"
              accept="application/pdf"
              icon={uploadThree}
            />

            <PrimaryButton type="submit" onClick={handleSubmit}>
              Enviar currículo
            </PrimaryButton>

            <Terms />
          </ApplyContainer>
        </Container>
      )}

      <Footer contentWidth="calc(6% + 744px + 440px);" />
    </>
  );
};
