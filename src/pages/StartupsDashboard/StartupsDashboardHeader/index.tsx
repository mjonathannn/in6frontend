import notificationsIcon from 'assets/img/notificationsIcon.svg';
import accountConfigIconWhite from 'assets/img/accountConfigIconWhite.svg';
import companyIconWhite from 'assets/img/companyIconWhite.svg';
import exitIconWhite from 'assets/img/exitIconWhite.svg';
import helpCenterIconWhite from 'assets/img/helpCenterIconWhite.svg';
import { developingAlert } from 'utils';

import { AppLogo } from 'components/AppLogo';
import { useHistory } from 'react-router-dom';
import { useCallback, useState } from 'react';
import {
  routeAccountConfiguration,
  routeFindStartups,
  routeSearchInvestors,
  routeSearchResumes,
  routeStartupVacancies,
} from 'routes/startupsRoutes/startupsRoutesAddresses';
import { useStartup } from 'hooks/startup';
import {
  HeaderContainer,
  HeaderSubContainer,
  TabButton,
  CompanyContainer,
  NavigationContainer,
  CompanyBox,
  ImageContainer,
} from './styles';

const STARTUPS_HEADER_TABS = {
  vacancies: {
    name: 'Minhas vagas',
    path: routeStartupVacancies,
  },
  searchResumes: {
    name: 'Pesquisar currículos',
    path: routeSearchResumes,
  },
  findStartups: {
    name: 'Encontrar startups',
    path: routeFindStartups,
  },
  searchInvestors: {
    name: 'Buscar investidores',
    path: routeSearchInvestors,
  },
};

export const StartupsDashboardHeader: React.FC = () => {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const {
    startupData: { name: startupName },
  } = useStartup();
  const [isCompanyBoxVisible, setIsCompanyBoxVisible] = useState(false);

  const handleChangeTab = useCallback(
    (destinyRoute: string) => history.push(destinyRoute),
    [history],
  );

  const handleSignOut = useCallback(() => {
    localStorage.clear();
    history.push('/');
  }, [history]);

  return (
    <HeaderContainer
      style={{
        position:
          pathname.endsWith('createVacancy') || pathname.endsWith('editVacancy')
            ? 'fixed'
            : 'relative',
      }}
    >
      <HeaderSubContainer>
        <NavigationContainer>
          <button type="button" onClick={() => handleChangeTab('')}>
            <AppLogo logoType="startups" />
          </button>

          {Object.entries(STARTUPS_HEADER_TABS).map(([key, { name, path }]) => (
            <TabButton
              key={key}
              isSelectedTab={path === pathname}
              onClick={() => handleChangeTab(path)}
            >
              {name}
            </TabButton>
          ))}
        </NavigationContainer>

        <CompanyContainer>
          <button
            type="button"
            className="notifications"
            onClick={developingAlert}
          >
            <img src={notificationsIcon} alt="Sino" />
          </button>

          <button
            type="button"
            onClick={() => setIsCompanyBoxVisible(value => !value)}
            onBlur={() => setIsCompanyBoxVisible(false)}
            className="company-data"
          >
            <span id="company-icon">{startupName.charAt(0).toUpperCase()}</span>
            <span id="company-name">{startupName}</span>
          </button>

          <CompanyBox
            isVisible={isCompanyBoxVisible}
            onMouseLeave={() => setIsCompanyBoxVisible(false)}
          >
            <button type="button">
              <ImageContainer>
                <img src={companyIconWhite} alt="Startup" />
              </ImageContainer>
              Minha startup
            </button>

            <button
              type="button"
              onClick={() => history.push(routeAccountConfiguration)}
            >
              <ImageContainer>
                <img
                  src={accountConfigIconWhite}
                  alt="Configurações da conta"
                />
              </ImageContainer>
              Configurações da conta
            </button>

            <button type="button" onClick={developingAlert}>
              <ImageContainer>
                <img src={helpCenterIconWhite} alt="Central de ajuda" />
              </ImageContainer>
              Central de ajuda
            </button>

            <button type="button" onClick={handleSignOut}>
              <ImageContainer>
                <img src={exitIconWhite} alt="Sair" />
              </ImageContainer>
              Sair
            </button>
          </CompanyBox>
        </CompanyContainer>
      </HeaderSubContainer>
    </HeaderContainer>
  );
};
