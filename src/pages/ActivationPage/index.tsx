import { PrimaryButton } from 'components/Buttons';
import { Loader } from 'components/Loader';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { activateAccount } from 'services/activateAccountServices';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { COMPANY_NAME, COMPANY_PRODUCT_NAME_1 } from 'constants/company';
import { routeBar, routeStartups } from 'routes/routesAddresses';
import { MainContainer, SubContainer, Div, Title, Text } from './styles';

export const ActivationPage: React.FC = () => {
  document.title = `Ativar Conta - ${COMPANY_NAME} ${COMPANY_PRODUCT_NAME_1}`;
  const history = useHistory();
  const { id } = useParams() as { id: string | number };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function activate() {
      const status = await activateAccount(id as number);

      if (status === 200) setIsLoading(false);
      else alert('Algo deu errado, recarregue a página por favor.');
    }

    activate();
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header logoType="empresas" redirectRoute={routeBar} />

      <MainContainer>
        <SubContainer>
          <Div>
            <Title>Conta Verificada!</Title>

            <Text>
              Sua conta foi verificada, clique no botão a seguir para continuar.
            </Text>

            <PrimaryButton
              type="button"
              onClick={() => history.push(routeStartups)}
            >
              Ir para Dashboard &#10132;
            </PrimaryButton>
          </Div>
        </SubContainer>
      </MainContainer>

      <Footer />
    </>
  );
};
