import { PrimaryButton } from 'components/Buttons';

import { useHistory } from 'react-router-dom';
import { routeBar, routeLogin } from 'routes/routesAddresses';

import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { COMPANY_NAME, COMPANY_PRODUCT_NAME_1 } from 'constants/company';
import { MainContainer, SubContainer, Text, Title, Div } from './styles';

export const ExpirationPage: React.FC = () => {
  document.title = `Sessão Expirada - ${COMPANY_NAME} ${COMPANY_PRODUCT_NAME_1}`;
  const history = useHistory();

  return (
    <>
      <Header logoType="empresas" redirectRoute={routeBar} />

      <MainContainer>
        <SubContainer>
          <Div>
            <Title>Sessão Expirada</Title>

            <Text>
              Sua sessão expirou, faça login novamente para continuar.
            </Text>

            <PrimaryButton
              type="button"
              className="primaryButton"
              onClick={() => history.push(routeLogin)}
            >
              Voltar para Login &#10132;
            </PrimaryButton>
          </Div>
        </SubContainer>
      </MainContainer>

      <Footer />
    </>
  );
};
