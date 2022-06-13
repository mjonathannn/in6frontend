import { COMPANY_NAME } from 'constants/company';

import { PrimaryButton, SecondaryButton } from 'components/Buttons';
import {
  InputErrorMessageStyle,
  InputNameStyle,
  InputStyle,
} from 'components/Input/styles';

import banner1 from 'assets/img/banner1.svg';
import step1 from 'assets/img/step1.svg';
import step2 from 'assets/img/step2.svg';
import step3 from 'assets/img/step3.svg';
import step4 from 'assets/img/step4.svg';
import resource1 from 'assets/img/resource1.svg';
import resource2 from 'assets/img/resource2.svg';
import resource3 from 'assets/img/resource3.svg';
import resource4 from 'assets/img/resource4.svg';
import resource5 from 'assets/img/resource5.svg';
import searchExample from 'assets/img/searchExample.svg';
import in6Logo from 'assets/img/in6Logo.svg';
import in6vagasLogo from 'assets/img/in6vagasLogo.svg';
import instagram from 'assets/img/instagram.svg';
import facebook from 'assets/img/facebook.svg';
import tiktok from 'assets/img/tiktok.svg';
import twitter from 'assets/img/twitter.svg';
import linkedin from 'assets/img/linkedin.svg';
import blockContent1 from 'assets/img/blockContent1.svg';
import blockContent2 from 'assets/img/blockContent2.svg';
import blockContent3 from 'assets/img/blockContent3.svg';
import blockContent4 from 'assets/img/blockContent4.svg';
import ufersaLogo from 'assets/img/ufersaLogo.svg';
import iagramLogo from 'assets/img/iagramLogo.svg';
import inovativaLogo from 'assets/img/inovativaLogo.svg';
import {
  ErrorDefaut,
  GrayBackground,
  GrayLine,
  PrimaryColor,
} from 'assets/colors/palette';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Select, { OptionTypeBase, StylesConfig } from 'react-select';
import { Footer } from 'components/Footer';
import { Terms } from 'components/Terms';
import { emailIsValid } from 'utils/validation';
import {
  HeaderMainContainer,
  RedirectButton,
  SectionMainContainer,
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  ReceiveUpdatesForm,
  CompanyFooterMainContainer,
} from './styles';

const isMobileScreen = window.innerWidth < 1000;
const selectElementLength = isMobileScreen ? '100%' : 200;
type RedirectButtonType =
  | 'how-to-use'
  | 'resources'
  | 'in6-vacancies'
  | 'candidates-tools'
  | undefined;

export const HomePagePrototype: React.FC = () => {
  document.title = COMPANY_NAME;

  const howToUseSection = useRef<HTMLDivElement>(null);
  const resourcesSection = useRef<HTMLDivElement>(null);
  const in6VacanciesSection = useRef<HTMLDivElement>(null);
  const candidatesToolsSection = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [emailInputBorderColor, setEmailInputBorderColor] = useState(GrayLine);
  const [emailInputHoverColor, setEmailInputHoverColor] =
    useState(PrimaryColor);
  const [emailErrorLabelVisible, setEmailErrorLabelVisible] = useState(false);
  const [emailErrorLabelText, setEmailErrorLabelText] = useState('');

  const [userType, setUserType] = useState(1);
  const [userTypeInputBorderColor, setUserTypeInputBorderColor] =
    useState(GrayLine);
  const [userTypeInputHoverColor, setUserTypeInputHoverColor] =
    useState(PrimaryColor);

  const [activeButton, setActiveButton] =
    useState<RedirectButtonType>(undefined);

  const userTypeColourStyles: StylesConfig<OptionTypeBase, false> = {
    menu: styles => ({
      ...styles,
      width: selectElementLength,
    }),
    control: styles => ({
      ...styles,
      width: selectElementLength,
      height: 48,
      borderRadius: 8,
      boxShadow: 'none',
      border: `solid 1px ${userTypeInputBorderColor}`,
      '&:hover': {
        border: `solid 2px ${userTypeInputHoverColor}`,
      },
      letterSpacing: 0.75,
      fontSize: 14,
      backgroundColor: GrayBackground,
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: 'black',
      width: selectElementLength,
      backgroundColor: isFocused ? '#ffb685' : undefined,
    }),
  };
  const userTypeOptions = [
    { id: 1, label: 'Eu sou empregador' },
    { id: 2, label: 'Eu sou candidato' },
  ];

  const sectionsArray = useMemo(
    () => [
      howToUseSection,
      resourcesSection,
      in6VacanciesSection,
      candidatesToolsSection,
    ],
    [
      howToUseSection,
      resourcesSection,
      in6VacanciesSection,
      candidatesToolsSection,
    ],
  );

  const getTopDistance = (element: HTMLDivElement) => element.offsetTop - 110;

  const getUpdatedValue = useCallback((): RedirectButtonType => {
    const { scrollY } = window;

    if (scrollY < getTopDistance(sectionsArray[0].current as HTMLDivElement)) {
      setActiveButton(undefined);
      return undefined;
    }

    for (let ind = 0; ind < sectionsArray.length; ind++) {
      const nextElement = sectionsArray[ind + 1];
      if (!nextElement) return 'candidates-tools';

      const currentElement = sectionsArray[ind].current as HTMLDivElement;
      const currentNextElement = nextElement.current as HTMLDivElement;
      if (
        scrollY >= getTopDistance(currentElement) &&
        scrollY < getTopDistance(currentNextElement)
      ) {
        return currentElement.getAttribute('id') as RedirectButtonType;
      }
    }

    return undefined;
  }, [sectionsArray]);

  const handleHighlightOnScroll = useCallback(() => {
    const updatedValue = getUpdatedValue();
    if (updatedValue && updatedValue !== activeButton) {
      setActiveButton(updatedValue);
    }
  }, [activeButton, getUpdatedValue]);

  useEffect(() => {
    if (sectionsArray[0])
      document.addEventListener('scroll', handleHighlightOnScroll);
    return () => {
      document.removeEventListener('scroll', handleHighlightOnScroll);
    };
  }, [handleHighlightOnScroll, sectionsArray]);

  const handleSubmit = useCallback(() => {
    if (!emailIsValid(email)) {
      let message = 'E-mail inválido';
      if (!email.length) message = 'Campo obrigatório';

      setEmailErrorLabelText(message);
      setEmailErrorLabelVisible(true);
      setEmailInputBorderColor(ErrorDefaut);
      setEmailInputHoverColor(ErrorDefaut);
    }
  }, [email]);

  return (
    <>
      <HeaderMainContainer>
        <div className="subContainer">
          <div className="accessContainer">
            <img src={in6Logo} alt="" />

            <RedirectButton
              isActive={activeButton === 'how-to-use'}
              href="#how-to-use"
            >
              Como usar
            </RedirectButton>
            <RedirectButton
              isActive={activeButton === 'resources'}
              href="#resources"
            >
              Recursos
            </RedirectButton>
            <RedirectButton
              isActive={activeButton === 'in6-vacancies'}
              href="#in6-vacancies"
            >
              IN6 Vagas
            </RedirectButton>
            <RedirectButton
              isActive={activeButton === 'candidates-tools'}
              href="#candidates-tools"
            >
              Ferramentas para candidatos
            </RedirectButton>
          </div>

          <PrimaryButton type="button" className="primaryButton">
            Disponível em breve
          </PrimaryButton>
        </div>
      </HeaderMainContainer>

      <SectionMainContainer>
        <div className="subContainer">
          <Section1>
            <p className="title">
              A ferramenta que ajuda a sua empresa a contratar mais rápido
            </p>

            <p className="description">
              Abandone de vez o currículo de papel em seu processo de
              recrutamento. A IN6 oferece uma plataforma completa para encontrar
              o funcionário ideal para sua empresa.
            </p>

            <SecondaryButton type="button" disabled className="secondaryButton">
              Em breve
            </SecondaryButton>
          </Section1>

          <img src={banner1} alt="banner1" width={1250} />

          <Section2 id="how-to-use" ref={howToUseSection}>
            <p className="description">
              Mais rápido e mais fácil do que qualquer outro serviço.
            </p>

            <p className="title">
              Começe com quatro <br />
              etapas fáceis
            </p>

            <img src={step1} alt="step1" />
            <img src={step2} alt="step2" />
            <img src={step3} alt="step2" />
            <img src={step4} alt="step4" />
          </Section2>

          <Section3 id="resources" ref={resourcesSection}>
            <p className="description">Seu recrutamento em outro nível.</p>

            <p className="title">
              Grandes recursos <br />
              para sua empresa
            </p>

            <div className="resource1">
              <img src={resource1} alt="resource1" />

              <div className="content">
                <p className="resource1Title">
                  O início da sua próxima contratação
                </p>

                <p className="resource1Description">
                  Crie suas vagas em menos de 5 minutos. Utilize os recursos da
                  IN6 Empresas para facilitar o processo de recrutamento e
                  controlar o fluxo de recebimento de currículos para cada vaga.
                </p>
              </div>
            </div>

            <div className="resource2">
              <img src={resource2} alt="resource2" />

              <div className="content">
                <p className="resource2Title">Compartilhe com todos</p>

                <p className="resource2Description">
                  Facilitamos a divulgação de sua vaga através da
                  disponibilização de um post para as redes sociais e a geração
                  de um link para uso na página de Trabalhe conosco da empresa.
                </p>
              </div>
            </div>

            <div className="resource3">
              <img src={resource3} alt="resource3" />

              <div className="content">
                <p className="resource3Title">Receba currículos</p>

                <div className="resource3Description">
                  Com a IN6 sua empresa não precisa mais lidar toda a papelada{' '}
                  dos currículos. Ao criar uma vaga é disponibilizado um link de{' '}
                  inscrição para que os candidatos possam enviar seus
                  currículos. Sua vaga também pode ser encontrada na{' '}
                  <span className="custom">IN6 VAGAS.</span>
                </div>
              </div>
            </div>

            <div className="resource4">
              <img src={resource4} alt="resource4" />

              <div className="content">
                <p className="resource4Title">Pesquise, avalie e converse </p>

                <p className="resource4Description">
                  Utilize a barra de pesquisa para localizar de forma rápida os
                  currículos cadastrados, agilizando o processo de análise.
                  Marque os candidatos que você gostou e converse diretamente
                  com eles utilizando o botão nativo para o WhatsApp.
                </p>
              </div>
            </div>

            <div className="resource5">
              <img src={resource5} alt="resource5" />

              <div className="content">
                <p className="resource5Title">Pague apenas quando usar</p>

                <p className="resource5Description">
                  Aqui as empresas não precisam solicitar demonstração ou
                  propostas para utilizar o serviço. Crie sua conta
                  gratuitamente e pague pelo serviço apenas quando você precisar
                  criar uma nova vaga. Com o pagamento aprovado, comece a
                  receber o currículo dos candidatos.
                </p>
              </div>
            </div>
          </Section3>

          <Section4 id="in6-vacancies" ref={in6VacanciesSection}>
            <img src={in6vagasLogo} alt="" />

            <p className="title">
              Encontre o trabalho <br />
              que você precisa
            </p>

            <p className="description">Em breve.</p>

            <p className="content">
              Com a <span className="custom">IN6 VAGAS</span>, os candidatos
              podem se candidatar em qualquer vaga de forma livre, sem precisar
              fazer nenhum tipo de cadastro e de graça. Encontrou uma vaga,
              preencheu as informações solicitadas, já está concorrendo ao
              trabalho.
            </p>

            <img src={searchExample} alt="" />
          </Section4>

          <Section5 id="candidates-tools" ref={candidatesToolsSection}>
            <p className="description">Vantagens de utilizar a IN6 VAGAS</p>

            <p className="title">
              Ferramentas que <br />
              ajudam os candidatos
            </p>

            <div>
              <img src={blockContent1} alt="" />
              <img src={blockContent2} alt="" />
            </div>
            <div>
              <img src={blockContent3} alt="" />
              <img src={blockContent4} alt="" />
            </div>
          </Section5>
        </div>

        <ReceiveUpdatesForm>
          <div className="informations">
            <p className="title">
              Receba nossas atualizações e os melhores conteúdos de RH em seu
              email
            </p>

            <p className="description">
              Sem spam, nós prometemos. Apenas informações úteis e conselhos de
              gestão de pessoas de vez em quando.
            </p>
          </div>
          <div className="form-data">
            <div>
              <InputNameStyle>Email</InputNameStyle>
              <InputStyle
                type="email"
                borderColor={emailInputBorderColor}
                hoverAndFocusColor={emailInputHoverColor}
                placeholder="Inserir email"
                autoComplete="off"
                onChange={ev => {
                  setEmailErrorLabelVisible(false);
                  setEmailInputBorderColor(GrayLine);
                  setEmailInputHoverColor(PrimaryColor);
                  setEmail(ev.target.value);
                }}
                value={email}
              />
              <InputErrorMessageStyle id="error-message">
                {emailErrorLabelVisible && emailErrorLabelText}
              </InputErrorMessageStyle>
            </div>

            <div className="form-line">
              <Select
                styles={userTypeColourStyles}
                options={userTypeOptions}
                value={userTypeOptions[userType - 1]}
                onChange={async ev => {
                  setUserType(ev?.id as number);
                  setUserTypeInputBorderColor(GrayLine);
                  setUserTypeInputHoverColor(PrimaryColor);
                }}
              />

              <PrimaryButton type="submit" onClick={handleSubmit}>
                Inscrever-se
              </PrimaryButton>
            </div>

            <Terms />
          </div>
        </ReceiveUpdatesForm>

        <CompanyFooterMainContainer>
          <div className="logos-line">
            <img src={in6Logo} alt="in6Logo" width={58} />

            <div className="other-logos">
              <p>Apoio & Incubação</p>

              <div className="ufersa-logos">
                <img src={ufersaLogo} alt="" />
                <canvas />
                <img src={iagramLogo} alt="" />
              </div>

              <div className="inovativa-logo">
                <p>Aceleração</p>
                <img src={inovativaLogo} alt="" />
              </div>
            </div>
          </div>

          <div className="contact">
            <div className="social-medias">
              <a href="https://www.instagram.com/in6.com.br/" target="blank">
                <img src={instagram} alt="instagram" />
              </a>
              <a href="." target="blank">
                <img src={facebook} alt="facebook" />
              </a>
              <a href="." target="blank">
                <img src={tiktok} alt="tiktok" />
              </a>
              <a href="." target="blank">
                <img src={twitter} alt="twitter" />
              </a>
              <a href="https://www.linkedin.com/company/in6/" target="blank">
                <img src={linkedin} alt="linkedin" />
              </a>
            </div>

            <p>contato@in6.com.br</p>
          </div>

          <Footer />
        </CompanyFooterMainContainer>
      </SectionMainContainer>
    </>
  );
};
