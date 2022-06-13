import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';

import {
  routeSignup,
  routeStartups,
  routeForgotPassword,
  routeBar,
} from 'routes/routesAddresses';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Loader } from 'components/Loader';
import { COMPANY_NAME, COMPANY_PRODUCT_NAME_1 } from 'constants/company';

import { PrimaryButton, SecondaryButton } from 'components/Buttons';
import {
  InputStyle,
  InputErrorMessageStyle,
  InputNameStyle,
} from 'components/Input/styles';
import {
  ErrorDefaut,
  MediumEmphasis,
  GrayLine,
  PrimaryColor,
} from 'assets/colors/palette';
import {
  authenticateCompany,
  authenticateCompanyNonExpireToken,
  existsEmail as verifyEmailExists,
} from 'services/companyServices';
import { emailIsValid } from 'utils/validation';
import {
  Container,
  BannerMainContainer,
  SectionMainContainer,
  SignupContainer,
  LoginContainer,
} from './styles';

export const LoginPage: React.FC = () => {
  document.title = `Entrar - ${COMPANY_NAME} ${COMPANY_PRODUCT_NAME_1}`;
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkboxSelected, setCheckboxSelected] = useState(false);

  const [emailInputBorderColor, setEmailInputBorderColor] = useState(GrayLine);
  const [passwordInputBorderColor, setPasswordInputBorderColor] =
    useState(GrayLine);

  const [emailInputHoverColor, setEmailInputHoverColor] =
    useState(PrimaryColor);
  const [passwordInputHoverColor, setPasswordInputHoverColor] =
    useState(PrimaryColor);

  const [emailErrorLabelVisible, setEmailErrorLabelVisible] = useState(false);
  const [passwordErrorLabelVisible, setPasswordErrorLabelVisible] =
    useState(false);

  const [emailErrorLabelText, setEmailErrorLabelText] = useState('');
  const [passwordErrorLabelText, setPasswordErrorLabelText] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleOnClickEntrar = useCallback(async () => {
    setIsLoading(true);

    if (email.length && password.length) {
      if (emailIsValid(email)) {
        const existsEmail = await verifyEmailExists(email);

        if (existsEmail) {
          if (checkboxSelected) {
            try {
              const {
                status,
                data: { token },
              } = await authenticateCompanyNonExpireToken({
                email,
                password,
              });

              if (status === 200) {
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                localStorage.setItem('keepConected', 'true');

                history.push(routeStartups);
                return;
              }
            } catch (error) {
              setPasswordErrorLabelText('Senha incorreta');
              setPasswordErrorLabelVisible(true);
              setPasswordInputBorderColor(ErrorDefaut);
              setPasswordInputHoverColor(ErrorDefaut);
              setPassword('');
            }
          } else {
            try {
              const {
                status,
                data: { token },
              } = await authenticateCompany({
                email,
                password,
              });

              if (status === 200) {
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                localStorage.setItem('keepConected', 'false');

                history.push(routeStartups);
                return;
              }
            } catch (error) {
              setPasswordErrorLabelText('Senha incorreta');
              setPasswordErrorLabelVisible(true);
              setPasswordInputBorderColor(ErrorDefaut);
              setPasswordInputHoverColor(ErrorDefaut);
              setPassword('');
            }
          }
        } else {
          setEmailErrorLabelText('Não existe uma conta com esse email');
          setEmailErrorLabelVisible(true);
          setEmailInputBorderColor(ErrorDefaut);
          setEmailInputHoverColor(ErrorDefaut);
          setPassword('');
        }
      } else {
        setEmailErrorLabelText('Insira um email válido');
        setEmailErrorLabelVisible(true);
        setEmailInputBorderColor(ErrorDefaut);
        setEmailInputHoverColor(ErrorDefaut);
        setPassword('');
      }
    } else {
      if (!email.length) {
        setEmailErrorLabelText('Campo obrigatório');
        setEmailErrorLabelVisible(true);
        setEmailInputBorderColor(ErrorDefaut);
        setEmailInputHoverColor(ErrorDefaut);
      }
      if (!password.length) {
        setPasswordErrorLabelText('Campo obrigatório');
        setPasswordErrorLabelVisible(true);
        setPasswordInputBorderColor(ErrorDefaut);
        setPasswordInputHoverColor(ErrorDefaut);
      }
    }

    setIsLoading(false);
  }, [checkboxSelected, email, history, password]);

  useEffect(() => {
    if (localStorage.getItem('keepConected') === 'true') {
      history.push(routeStartups);
    }
  }, [history]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Container>
        <Header logoType="empresas" redirectRoute={routeBar} />

        <div className="center-container">
          <BannerMainContainer>
            <div className="subContainer">
              <p>
                Para criar vagas, acompanhar o recebimento de currículos e<br />
                ter acesso aos novos recursos, acesse sua conta
              </p>
            </div>
          </BannerMainContainer>

          <SectionMainContainer>
            <div className="subContainer">
              <LoginContainer>
                <p className="secondaryTitle">Já é cliente?</p>

                <p className="title">Acesse sua conta</p>

                <InputNameStyle>Email</InputNameStyle>
                <InputStyle
                  borderColor={emailInputBorderColor}
                  hoverAndFocusColor={emailInputHoverColor}
                  placeholder="inserir email"
                  autoComplete="off"
                  value={email}
                  autoFocus
                  onChange={ev => {
                    setEmail(ev.target.value);
                    setEmailErrorLabelVisible(false);
                    setEmailInputBorderColor(GrayLine);
                    setEmailInputHoverColor(PrimaryColor);
                  }}
                />
                <InputErrorMessageStyle>
                  {emailErrorLabelVisible && emailErrorLabelText}
                </InputErrorMessageStyle>

                <InputNameStyle>Senha</InputNameStyle>
                <InputStyle
                  borderColor={passwordInputBorderColor}
                  hoverAndFocusColor={passwordInputHoverColor}
                  type="password"
                  placeholder="inserir senha"
                  autoComplete="off"
                  value={password}
                  onChange={ev => {
                    setPasswordErrorLabelVisible(false);
                    setPasswordInputBorderColor(GrayLine);
                    setPasswordInputHoverColor(PrimaryColor);
                    setPassword(ev.target.value);
                  }}
                />
                <InputErrorMessageStyle>
                  {passwordErrorLabelVisible && passwordErrorLabelText}
                </InputErrorMessageStyle>

                <div>
                  <Checkbox
                    className="checkbox"
                    inputProps={{ 'aria-label': 'Checkbox' }}
                    sx={{
                      color: MediumEmphasis,
                      '&.Mui-checked': {
                        color: PrimaryColor,
                      },
                    }}
                    onChange={() =>
                      checkboxSelected
                        ? setCheckboxSelected(false)
                        : setCheckboxSelected(true)
                    }
                  />

                  <p className="labelKeepConected">Manter conectado</p>

                  <button
                    className="labelForgotPass"
                    type="button"
                    onClick={() => history.push(routeForgotPassword)}
                  >
                    Esqueceu a senha?
                  </button>
                </div>

                <PrimaryButton
                  type="submit"
                  className="primaryButton"
                  onClick={handleOnClickEntrar}
                >
                  Entrar agora
                </PrimaryButton>
              </LoginContainer>

              <SignupContainer>
                <p className="secondaryTitle">Ainda não tem conta?</p>

                <p className="title">Cadastre-se grátis</p>

                <p className="description">
                  Tenha acesso a recursos que simplificarão o seu processo de
                  recrutamento e seleção de candidatos. <br />É grátis e leva
                  apenas 1 minuto.
                </p>

                <SecondaryButton
                  type="button"
                  onClick={() => history.push(routeSignup)}
                >
                  Cadastrar empresa
                </SecondaryButton>
              </SignupContainer>
            </div>
          </SectionMainContainer>
        </div>
      </Container>

      <Footer />
    </>
  );
};
