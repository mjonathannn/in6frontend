import { useHistory } from 'react-router-dom';

import {
  routeLogin,
  routeSignup,
  routeFeedVacancies,
} from 'routes/routesAddresses';
import { developingAlert } from 'utils';
import { Footer } from 'components/Footer';
import { COMPANY_NAME, COMPANY_PRODUCT_NAME_1 } from 'constants/company';

import {
  PrimaryButton,
  SecondaryButton,
  SimpleButton,
} from 'components/Buttons';

import in6empresasLogo from 'assets/img/in6empresasLogo.svg';
import banner1 from 'assets/img/banner1.svg';
import step1 from 'assets/img/step1.svg';
import step2 from 'assets/img/step2.svg';
import step3 from 'assets/img/step3.svg';
import step4 from 'assets/img/step4.svg';
import resource1 from 'assets/img/resource1.svg';
import resource2 from 'assets/img/resource2.svg';
import resource3 from 'assets/img/resource3.svg';
import resource4 from 'assets/img/resource4.svg';
import in6Logo from 'assets/img/in6Logo.svg';
import ufersaLogo from 'assets/img/ufersaLogo.svg';
import iagramLogo from 'assets/img/iagramLogo.svg';
import instagram from 'assets/img/instagram.svg';
import facebook from 'assets/img/facebook.svg';
import tiktok from 'assets/img/tiktok.svg';
import twitter from 'assets/img/twitter.svg';
import linkedin from 'assets/img/linkedin.svg';
import arrowRightOrange from 'assets/img/arrowRightOrange.svg';
import {
  HeaderMainContainer,
  SectionMainContainer,
  Section1,
  Section2,
  Section3,
  CompanyFooterMainContainer,
} from './styles';

export const HomePage: React.FC = () => {
  document.title = `${COMPANY_NAME} ${COMPANY_PRODUCT_NAME_1}`;
  const history = useHistory();

  return (
    <>
      <HeaderMainContainer>
        <div className="subContainer">
          <img src={in6empresasLogo} alt="" />

          <div className="accessContainer">
            <SimpleButton
              type="button"
              className="simpleButton"
              onClick={() => history.push(routeFeedVacancies)}
            >
              Procurar emprego
            </SimpleButton>

            <SimpleButton
              type="button"
              className="simpleButton"
              onClick={() => history.push(routeLogin)}
            >
              Entrar agora
            </SimpleButton>

            <PrimaryButton
              type="button"
              className="primaryButton"
              onClick={() => history.push(routeSignup)}
            >
              Cadastrar empresa
            </PrimaryButton>
          </div>
        </div>
      </HeaderMainContainer>

      <SectionMainContainer>
        <div className="subContainer">
          <Section1>
            <p className="title">Um novo jeito do seu negócio contratar.</p>

            <p className="description">
              Abandone de vez o currículo de papel em seu processo de
              recurtamento. Com a IN6 sua empresa tem acesso a uma plataforma
              completa para encontrar de maneira simples e rápida o funcionário
              ideal para seu negócio.
            </p>

            <SecondaryButton
              type="button"
              className="secondaryButton"
              onClick={() => history.push(routeSignup)}
            >
              Criar sua conta agora
            </SecondaryButton>
          </Section1>

          <img src={banner1} alt="banner1" width={1250} />

          <Section2>
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

          <Section3>
            <p className="description">Seu recrutamento em outro nível.</p>

            <p className="title">
              Grandes recursos <br />
              para sua empresa
            </p>

            <div className="resource1">
              <img src={resource1} alt="resource1" />

              <p className="resource1Title">
                O início da sua <br />
                próxima contratação
              </p>

              <p className="resource1Description">
                Crie suas vagas em menos de 5 minutos. Utilize <br />
                os recursos da IN6 Emresas para facilitar o <br />
                processo de recrutamento e controlar o fluxo de <br />
                recebimento de currículos para de cada vaga.
              </p>
            </div>

            <div className="resource2">
              <img src={resource2} alt="resource2" />

              <p className="resource2Title">Compartilhe com todos</p>

              <p className="resource2Description">
                Facilitamos a divulgação de sua vaga através <br />
                da disponibilização de um post para as redes <br />
                sociais e a geração de um link para uso na <br />
                página de Trabalhe de Conosco da empresa.
              </p>
            </div>

            <div className="resource3">
              <img src={resource3} alt="resource3" />

              <p className="resource3Title">Receba currículos</p>

              <div className="resource3Description">
                Com a IN6 sua empresa não precisa mais lidar toda a papelada{' '}
                <br />
                dos currículos. Ao criar uma vaga é disponibilizado um link de{' '}
                <br />
                inscrição para que os candidatos possam enviar seus currículos.{' '}
                <br />
                Sua vaga também pode ser encontrada na{' '}
                <p className="custom">IN6 VAGAS.</p>
              </div>

              <button
                type="button"
                className="button"
                onClick={() => history.push(routeFeedVacancies)}
              >
                <img src={arrowRightOrange} alt="arrowRightOrange" />
                Ir para a IN6 VAGAS
              </button>
            </div>

            <div className="resource4">
              <img src={resource4} alt="resource4" />

              <p className="resource4Title">Pesquise, avalie e coverse </p>

              <p className="resource4Description">
                Utilize a barra de pesquisa para localizar de forma <br />
                rápida os currículos cadastrados, agilizando o processo <br />
                de análise. Marque os candidatos que você gostou e <br />
                converse diretamente com eles utilizando o botão <br />
                nativo para o WhatsApp.
              </p>
            </div>
          </Section3>
        </div>
      </SectionMainContainer>

      <CompanyFooterMainContainer>
        <div className="subContainer">
          <div className="container1">
            <img className="in6Logo" src={in6Logo} alt="in6Logo" />
            <p>
              IN6 Ltda. CNPJ: 00.623.904/0003-35 Rua Sebastião Martins Lopes,
              246 - Centro, Itajá/RN 59513-000
            </p>
            <img className="ufersaLogo" src={ufersaLogo} alt="" />
            <p className="separator" />
            <img src={iagramLogo} alt="iagramLogo" />
          </div>

          <div className="container2">
            <p className="p1">Central de relacionamento</p>
            <p className="p2">9h às 18h - Segunda a sexta, exceto feriados</p>
            <p className="p3">WhatsApp</p>
            <p className="p4">84 4002 8922</p>
            <p className="p5">Email</p>
            <p className="p6">faleconosco@in6.com.br</p>
          </div>

          <div className="container3">
            <a href=".">
              <img src={instagram} alt="instagram" />
            </a>
            <a href=".">
              <img src={facebook} alt="facebook" />
            </a>
            <a href=".">
              <img src={tiktok} alt="facebook" />
            </a>
            <a href=".">
              <img src={twitter} alt="twitter" />
            </a>
            <a href=".">
              <img src={linkedin} alt="linkedin" />
            </a>

            <SecondaryButton type="button" onClick={developingAlert}>
              Central de ajuda
            </SecondaryButton>
          </div>
        </div>
      </CompanyFooterMainContainer>

      <Footer />
    </>
  );
};
