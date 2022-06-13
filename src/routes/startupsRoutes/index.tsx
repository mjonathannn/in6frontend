import { StartupsDashboardHeader } from 'pages/StartupsDashboard/StartupsDashboardHeader';
import { FindStartupsTab } from 'pages/StartupsDashboard/Tabs/FindStartupsTab';
import { SearchInvestorsTab } from 'pages/StartupsDashboard/Tabs/SearchInvestorsTab';
import { SearchResumesTab } from 'pages/StartupsDashboard/Tabs/SearchResumesTab';
import { StartupVacanciesTab } from 'pages/StartupsDashboard/Tabs/StartupVacanciesTab';
import { VacancyFormWithStepsTab } from 'pages/StartupsDashboard/Tabs/VacancyFormWithStepsTab';
import { VacancyDetailsTab } from 'pages/StartupsDashboard/Tabs/VacancyDetailsTab';
import { Footer } from 'components/Footer';
import { Loader } from 'components/Loader';

import { COMPANY_NAME, COMPANY_PRODUCT_NAME_1 } from 'constants/company';
import { useStartup } from 'hooks/startup';
import { useEffect, useState } from 'react';

import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  findOneCompany,
  verifyActivation,
  isAuthenticated as verifyAuthentication,
} from 'services/companyServices';
import { ICompany } from 'types/company';
import { useFooter } from 'hooks/footer';
import { existEmail, existToken } from 'utils/validation';

import { AccountConfigurationTab } from 'pages/StartupsDashboard/Tabs/AccountConfigurationTab';
import {
  routeBar,
  routeExpiration,
  routeStartups,
  routeVerification,
} from '../routesAddresses';
import {
  routeAccountConfiguration,
  routeCreateVacancy,
  routeEditVacancy,
  routeFindStartups,
  routeSearchInvestors,
  routeSearchResumes,
  routeStartupVacancies,
  routeVacancyDetails,
} from './startupsRoutesAddresses';

const STARTUPS_DASHBOARD_ROUTES = {
  vacancies: {
    Component: StartupVacanciesTab,
    path: routeStartupVacancies,
  },
  createVacancy: {
    Component: VacancyFormWithStepsTab,
    path: [routeCreateVacancy, routeEditVacancy],
  },
  vacancyDetails: {
    Component: VacancyDetailsTab,
    path: routeVacancyDetails,
  },
  searchResumes: {
    Component: SearchResumesTab,
    path: routeSearchResumes,
  },
  findStartups: {
    Component: FindStartupsTab,
    path: routeFindStartups,
  },
  searchInvestors: {
    Component: SearchInvestorsTab,
    path: routeSearchInvestors,
  },
  accountConfiguration: {
    Component: AccountConfigurationTab,
    path: routeAccountConfiguration,
  },
};

export const StartupsRoutes: React.FC = () => {
  const history = useHistory();
  const { changeFooterUpdateData } = useFooter();
  const {
    startupData: { name: startupName },
    updateStartupState,
  } = useStartup();

  document.title = `${COMPANY_NAME} ${COMPANY_PRODUCT_NAME_1} ${
    startupName ? `- ${startupName}` : ''
  }`;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isLoadingStartup, setIsLoadingStartup] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (existToken() && existEmail()) {
        const email = localStorage.getItem('email') ?? '';

        const startup = (await findOneCompany(email)) as ICompany;
        const isAuth = await verifyAuthentication({
          token: localStorage.getItem('token') ?? '',
        });
        const isAct = await verifyActivation(email);

        localStorage.setItem(
          'notifications',
          JSON.stringify({
            emailNotification: startup.emailNotifications,
            desktopNotification: startup.desktopNotifications,
            whatsappNotification: startup.whatsappNotifications,
          }),
        );

        setIsAuthenticated(isAuth);
        setIsActivated(isAct);
        updateStartupState(startup);
      }

      setIsLoadingStartup(false);
    }

    fetchData();
  }, [updateStartupState]);

  useEffect(() => {
    const { pathname } = history.location;
    if (pathname === routeStartups) history.push(routeStartupVacancies);

    changeFooterUpdateData(pathname);
  }, [changeFooterUpdateData, history, history.location.pathname]);

  if (!existEmail() || !existToken()) return <Redirect to={routeBar} />;
  if (isLoadingStartup) return <Loader />;
  if (!isAuthenticated) return <Redirect to={routeExpiration} />;
  if (!isActivated) return <Redirect to={routeVerification} />;

  return (
    <>
      <StartupsDashboardHeader />

      <main>
        {Object.entries(STARTUPS_DASHBOARD_ROUTES).map(
          ([key, { Component, path }]) => (
            <Route key={key} exact path={path} component={Component} />
          ),
        )}
      </main>

      <Footer contentWidth="1246px" />
    </>
  );
};
