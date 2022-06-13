import { PrimaryButton } from 'components/Buttons';

import { routeStartups, routeBar } from 'routes/routesAddresses';
import { useHistory, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Loader } from 'components/Loader';
import { shortBaseURLFrontend } from 'services/baseUrl';
import { COMPANY_NAME, COMPANY_PRODUCT_NAME_1 } from 'constants/company';

import number1 from 'assets/img/number1.svg';
import number2 from 'assets/img/number2.svg';
import number3 from 'assets/img/number3.svg';
import {
  isAuthenticated,
  verifyActivation,
  verifyActivationEmailSended,
} from 'services/companyServices';
import { sendEmail } from 'services/activateAccountServices';
import { existToken, existEmail } from 'utils/validation';

import {
  MainContainer,
  SubContainer,
  Title,
  Description,
  Email,
  Steps,
} from './styles';

export const VerificationPage: React.FC = () => {
  document.title = `Verificar - ${COMPANY_NAME} ${COMPANY_PRODUCT_NAME_1}`;
  const history = useHistory();

  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (existToken() && existEmail()) {
        const isAuth = await isAuthenticated({
          token: localStorage.getItem('token') ?? '',
        });

        const { id, emailSended: verifyEmailSended } =
          await verifyActivationEmailSended(
            localStorage.getItem('email') ?? '',
          );

        setIsTokenValid(isAuth);

        if (!verifyEmailSended) {
          const status = await sendEmail(
            id,
            localStorage.getItem('email') ?? '',
            shortBaseURLFrontend,
          );

          if (status === 200) alert('E-mail enviado com sucesso!');
          else alert('Ops! Algo deu errado.');
        }

        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (!existToken() || !existEmail() || !isTokenValid) {
    return <Redirect to={routeBar} />;
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <Header logoType="empresas" redirectRoute={routeBar} />

      <MainContainer>
        <SubContainer>
          <Title>Obrigado por se cadastrar!</Title>

          <Description>
            Estamos muito felizes por você registrar sua empresa na Suavaga.
            Gostaríamos de realizar uma rápida confirmação, apenas para garantir
            que é você mesmo.
          </Description>

          <img className="number" src={number1} alt="" />
          <Steps>Acesse o email</Steps>
          <Email>{localStorage.getItem('email')}</Email>

          <img className="number" src={number2} alt="" />
          <Steps>Abra a nossa mensagem de verificação</Steps>

          <img className="number" src={number3} alt="" />
          <Steps>Confirme seu email para ativar a assinatura</Steps>

          <PrimaryButton
            type="button"
            className="primaryButton"
            onClick={async () => {
              const isActivated = await verifyActivation(
                localStorage.getItem('email') ?? '',
              );

              if (isActivated) history.push(routeStartups);
              else alert('É necessário ativar a conta para prosseguir!');
            }}
          >
            Ir para Painel de vagas &#10132;
          </PrimaryButton>
        </SubContainer>
      </MainContainer>

      <Footer />
    </>
  );
};
