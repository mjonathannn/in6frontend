import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { SignUpPage } from 'pages/SignupPage';
import { VerificationPage } from 'pages/VerificationPage';
import { ExpirationPage } from 'pages/ExpirationPage';
import { ForgotPassword } from 'pages/ForgotPassword';
import { ActivationPage } from 'pages/ActivationPage';
import { FeedVacancies } from 'pages/FeedVacancies';
import { HomePagePrototype } from 'pages/HomePagePrototype';
import { VacancyApply } from 'pages/VacancyApply';
import { ScrollToTop } from 'components/ScrollToTop';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StartupContext } from 'hooks/startup';
import {
  prototypeRouteBar,
  routeActivation,
  routeBar,
  routeStartups,
  routeExpiration,
  routeFeedVacancies,
  routeForgotPassword,
  routeLogin,
  routeSignup,
  routeVacancyApply,
  routeVerification,
} from './routesAddresses';
import { StartupsRoutes } from './startupsRoutes';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Switch>
        <Route exact path={routeBar} component={HomePagePrototype} />
        <Route exact path={prototypeRouteBar} component={HomePage} />
        <Route exact path={routeLogin} component={LoginPage} />
        <Route exact path={routeSignup} component={SignUpPage} />
        <Route exact path={routeVerification} component={VerificationPage} />
        <Route exact path={routeExpiration} component={ExpirationPage} />
        <Route exact path={routeForgotPassword} component={ForgotPassword} />
        <Route path={routeActivation} component={ActivationPage} />
        <Route exact path={routeFeedVacancies} component={FeedVacancies} />
        <Route
          exact
          path={`${routeVacancyApply}/:vacancyId`}
          component={VacancyApply}
        />

        <StartupContext>
          <Route path={routeStartups} component={StartupsRoutes} />
        </StartupContext>
      </Switch>
    </BrowserRouter>
  );
};
