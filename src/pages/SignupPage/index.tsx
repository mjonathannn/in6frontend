import {
  ErrorDefaut,
  GrayBackground,
  GrayLine,
  PrimaryColor,
} from 'assets/colors/palette';

import {
  routeBar,
  routeLogin,
  routeVerification,
} from 'routes/routesAddresses';

import {
  InputNameStyle,
  InputStyle,
  InputErrorMessageStyle,
} from 'components/Input/styles';
import { SecondaryButton, PrimaryButton } from 'components/Buttons';

import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Select, { OptionTypeBase, StylesConfig } from 'react-select';
import { mask, unMask } from 'remask';

import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { COMPANY_NAME, COMPANY_PRODUCT_NAME_1 } from 'constants/company';
import { developingAlert } from 'utils';
import { findAllCitiesByState } from 'services/cityServices';
import { Loader } from 'components/Loader';
import {
  authenticateCompany,
  createCompany,
  existsEmail as verifyExistsEmail,
  existsPhone as verifyExistsPhone,
} from 'services/companyServices';
import { phoneIsValid, emailIsValid } from 'utils/validation';

import { stateOptions } from 'utils/typeOptions';
import {
  BannerMainContainer,
  BannerSubContainer,
  SectionMainContainer,
  SectionSubContainer,
  LoginContainer,
  SignupContainer,
} from './styles';

export const SignUpPage: React.FC = () => {
  document.title = `Cadastrar - ${COMPANY_NAME} ${COMPANY_PRODUCT_NAME_1}`;
  const history = useHistory();

  const [name, setName] = useState('');
  const [state, setState] = useState(0);
  const [city, setCity] = useState(0);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameInputBorderColor, setNameInputBorderColor] = useState(GrayLine);
  const [cityInputBorderColor, setCityInputBorderColor] = useState(GrayLine);
  const [stateInputBorderColor, setStateInputBorderColor] = useState(GrayLine);
  const [phoneInputBorderColor, setPhoneInputBorderColor] = useState(GrayLine);
  const [emailInputBorderColor, setEmailInputBorderColor] = useState(GrayLine);
  const [passwordInputBorderColor, setPasswordInputBorderColor] =
    useState(GrayLine);
  const [confirmPasswordInputBorderColor, setConfirmPasswordInputBorderColor] =
    useState(GrayLine);

  const [nameInputHoverColor, setNameInputHoverColor] = useState(PrimaryColor);
  const [stateInputHoverColor, setStateInputHoverColor] =
    useState(PrimaryColor);
  const [cityInputHoverColor, setCityInputHoverColor] = useState(PrimaryColor);
  const [phoneInputHoverColor, setPhoneInputHoverColor] =
    useState(PrimaryColor);
  const [emailInputHoverColor, setEmailInputHoverColor] =
    useState(PrimaryColor);
  const [passwordInputHoverColor, setPasswordInputHoverColor] =
    useState(PrimaryColor);
  const [confirmPasswordInputHoverColor, setConfirmPasswordInputHoverColor] =
    useState(PrimaryColor);

  const [nameErrorLabelVisible, setNameErrorLabelVisible] = useState(false);
  const [stateErrorLabelVisible, setStateErrorLabelVisible] = useState(false);
  const [cityErrorLabelVisible, setCityErrorLabelVisible] = useState(false);
  const [emailErrorLabelVisible, setEmailErrorLabelVisible] = useState(false);
  const [phoneErrorLabelVisible, setPhoneErrorLabelVisible] = useState(false);
  const [passwordErrorLabelVisible, setPasswordErrorLabelVisible] =
    useState(false);
  const [
    confirmPasswordErrorLabelVisible,
    setConfirmPasswordErrorLabelVisible,
  ] = useState(false);

  const [nameErrorLabelText, setNameErrorLabelText] = useState('');
  const [stateErrorLabelText, setStateErrorLabelText] = useState('');
  const [cityErrorLabelText, setCityErrorLabelText] = useState('');
  const [phoneErrorLabelText, setPhoneErrorLabelText] = useState('');
  const [emailErrorLabelText, setEmailErrorLabelText] = useState('');
  const [passwordErrorLabelText, setPasswordErrorLabelText] = useState('');
  const [confirmPasswordErrorLabelText, setConfirmPasswordErrorLabelText] =
    useState('');

  const [cityInputDisabled, setCityInputDisabled] = useState(true);

  const [citiesList, setCitiesList] = useState<OptionTypeBase[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const stateColourStyles: StylesConfig<OptionTypeBase, false> = {
    control: styles => ({
      ...styles,
      width: 400,
      height: 40,
      borderRadius: 8,
      boxShadow: 'none',
      border: `solid 1px ${stateInputBorderColor}`,
      '&:hover': {
        border: `solid 2px ${stateInputHoverColor}`,
      },
      letterSpacing: 0.75,
      fontSize: 14,
      backgroundColor: GrayBackground,
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: 'black',
      backgroundColor: isFocused ? '#ffb685' : undefined,
    }),
  };
  const cityColourStyles: StylesConfig<OptionTypeBase, false> = {
    control: (styles, { isDisabled }) => ({
      ...styles,
      width: 400,
      height: 40,
      borderRadius: 8,
      boxShadow: 'none',
      border: `solid 1px ${cityInputBorderColor}`,
      '&:hover': {
        border: `solid 2px ${cityInputHoverColor}`,
      },
      letterSpacing: 0.75,
      fontSize: 14,
      backgroundColor: isDisabled ? '#f2f2f2' : GrayBackground,
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: 'black',
      backgroundColor: isFocused ? '#ffb685' : undefined,
    }),
  };

  const allInputsAreFilled = () => {
    return (
      name.length &&
      state !== 0 &&
      city !== 0 &&
      phone.length &&
      email.length &&
      password.length &&
      confirmPassword.length
    );
  };

  const handleOnClickCadastrar = async () => {
    setIsLoading(true);

    if (allInputsAreFilled()) {
      if (phoneIsValid(phone)) {
        const existsPhone = await verifyExistsPhone(phone);

        if (!existsPhone) {
          if (emailIsValid(email)) {
            const existsEmail = await verifyExistsEmail(email);

            if (!existsEmail) {
              if (password.length >= 8) {
                if (password === confirmPassword) {
                  const status = await createCompany({
                    name,
                    password,
                    email,
                    phone,
                    cityDTO: {
                      id: city,
                      stateDTO: {
                        id: state,
                      },
                    },
                    businessSectorDTO: {
                      id: 1,
                    },
                  });

                  if (status === 201) {
                    const {
                      status: authenticateStatus,
                      data: { token },
                    } = await authenticateCompany({
                      email,
                      password,
                    });

                    if (authenticateStatus === 200) {
                      localStorage.setItem('token', token);
                      localStorage.setItem('email', email);

                      history.push(routeVerification);
                    }
                  }
                } else {
                  setConfirmPasswordErrorLabelText('As senhas não conferem');
                  setConfirmPasswordErrorLabelVisible(true);
                  setConfirmPasswordInputBorderColor(ErrorDefaut);
                  setConfirmPasswordInputHoverColor(ErrorDefaut);
                }
              } else {
                setPasswordErrorLabelText(
                  'A senha precisa ter no mínimo 8 caracteres',
                );
                setPasswordErrorLabelVisible(true);
                setPasswordInputBorderColor(ErrorDefaut);
                setPasswordInputHoverColor(ErrorDefaut);
                setConfirmPassword('');
              }
            } else {
              setEmailErrorLabelText('Esse email já está em uso');
              setEmailErrorLabelVisible(true);
              setEmailInputBorderColor(ErrorDefaut);
              setEmailInputHoverColor(ErrorDefaut);
            }
          } else {
            setEmailErrorLabelText('Insira um email válido');
            setEmailErrorLabelVisible(true);
            setEmailInputBorderColor(ErrorDefaut);
            setEmailInputHoverColor(ErrorDefaut);
          }
        } else {
          setPhoneErrorLabelText('Esse número já está em uso');
          setPhoneErrorLabelVisible(true);
          setPhoneInputBorderColor(ErrorDefaut);
          setPhoneInputHoverColor(ErrorDefaut);
        }
      } else {
        setPhoneErrorLabelText('Insira um número válido');
        setPhoneErrorLabelVisible(true);
        setPhoneInputBorderColor(ErrorDefaut);
        setPhoneInputHoverColor(ErrorDefaut);
      }
    } else {
      if (!name.length) {
        setNameErrorLabelText('Campo obrigatório');
        setNameErrorLabelVisible(true);
        setNameInputBorderColor(ErrorDefaut);
        setNameInputHoverColor(ErrorDefaut);
      }
      if (state === 0) {
        setStateErrorLabelText('Campo obrigatório');
        setStateErrorLabelVisible(true);
        setStateInputBorderColor(ErrorDefaut);
        setStateInputHoverColor(ErrorDefaut);
      }
      if (city === 0) {
        setCityErrorLabelText('Campo obrigatório');
        setCityErrorLabelVisible(true);
        setCityInputBorderColor(ErrorDefaut);
        setCityInputHoverColor(ErrorDefaut);
      }
      if (!phone.length) {
        setPhoneErrorLabelText('Campo obrigatório');
        setPhoneErrorLabelVisible(true);
        setPhoneInputBorderColor(ErrorDefaut);
        setPhoneInputHoverColor(ErrorDefaut);
      }
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
      if (!confirmPassword.length) {
        setConfirmPasswordErrorLabelText('Campo obrigatório');
        setConfirmPasswordErrorLabelVisible(true);
        setConfirmPasswordInputBorderColor(ErrorDefaut);
        setConfirmPasswordInputHoverColor(ErrorDefaut);
      }
    }

    setIsLoading(false);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Header logoType="empresas" redirectRoute={routeBar} />

      <BannerMainContainer>
        <BannerSubContainer>
          <p>
            Tenha acesso a recursos que simplificarão o seu processo de <br />
            recrutamento e seleção de candidatos. É grátis e leva apenas 1
            minuto.
          </p>
        </BannerSubContainer>
      </BannerMainContainer>

      <SectionMainContainer>
        <SectionSubContainer>
          <LoginContainer>
            <p className="secondaryTitle">Já é cliente?</p>

            <p className="title">Acesse sua conta</p>

            <p className="description">
              Para criar vagas, acompanhar o recebimento <br />
              de currículos e ter acesso aos novos recursos,
              <br /> acesse sua conta.
            </p>

            <SecondaryButton
              type="button"
              onClick={() => history.push(routeLogin)}
            >
              Entrar agora
            </SecondaryButton>
          </LoginContainer>

          <SignupContainer>
            <p className="secondaryTitle">Ainda não tem conta?</p>

            <p className="title">Cadastre-se grátis</p>

            <p className="sectionTitle">Identificação da empresa</p>

            <InputNameStyle>Nome da empresa</InputNameStyle>
            <InputStyle
              borderColor={nameInputBorderColor}
              hoverAndFocusColor={nameInputHoverColor}
              placeholder="Inserir nome da empresa"
              autoComplete="off"
              value={name}
              autoFocus
              onChange={ev => {
                setName(ev.target.value);
                setNameErrorLabelVisible(false);
                setNameInputBorderColor(GrayLine);
                setNameInputHoverColor(PrimaryColor);
              }}
            />
            <InputErrorMessageStyle>
              {nameErrorLabelVisible && nameErrorLabelText}
            </InputErrorMessageStyle>

            <InputNameStyle>Estado</InputNameStyle>
            <Select
              styles={stateColourStyles}
              options={stateOptions}
              placeholder="Inserir estado"
              onFocus={() => setCity(0)}
              onChange={async ev => {
                setState(ev?.id as number);
                setStateErrorLabelVisible(false);
                setStateInputBorderColor(GrayLine);
                setStateInputHoverColor(PrimaryColor);

                const cities = await findAllCitiesByState(ev?.id as number);

                setCitiesList(
                  cities.map(({ id, name: label }) => ({ id, label })),
                );
                setCityInputDisabled(false);
              }}
            />
            <InputErrorMessageStyle>
              {stateErrorLabelVisible && stateErrorLabelText}
            </InputErrorMessageStyle>

            <InputNameStyle>Cidade</InputNameStyle>
            <Select
              styles={cityColourStyles}
              options={citiesList}
              placeholder="Inserir cidade"
              isDisabled={cityInputDisabled}
              isLoading={cityInputDisabled}
              onChange={ev => {
                setCity(ev?.id);
                setCityErrorLabelVisible(false);
                setCityInputBorderColor(GrayLine);
                setCityInputHoverColor(PrimaryColor);
              }}
            />
            <InputErrorMessageStyle>
              {cityErrorLabelVisible && cityErrorLabelText}
            </InputErrorMessageStyle>

            <InputNameStyle>Telefone</InputNameStyle>
            <InputStyle
              borderColor={phoneInputBorderColor}
              hoverAndFocusColor={phoneInputHoverColor}
              placeholder="Ex: 88 9 9999-9999"
              autoComplete="off"
              value={phone}
              onChange={ev => {
                setPhoneInputBorderColor(GrayLine);
                setPhoneInputHoverColor(PrimaryColor);

                const originalValue = unMask(ev.target.value);
                const maskedValue = mask(originalValue, ['(99) 9 9999-9999']);

                setPhone(maskedValue);
              }}
            />
            <InputErrorMessageStyle>
              {phoneErrorLabelVisible && phoneErrorLabelText}
            </InputErrorMessageStyle>

            <div className="sectionTitle2">Dados de acesso</div>

            <InputNameStyle>Email</InputNameStyle>
            <InputStyle
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
            <InputErrorMessageStyle>
              {emailErrorLabelVisible && emailErrorLabelText}
            </InputErrorMessageStyle>

            <InputNameStyle>Senha</InputNameStyle>
            <InputStyle
              borderColor={passwordInputBorderColor}
              hoverAndFocusColor={passwordInputHoverColor}
              type="password"
              placeholder="Inserir senha"
              autoComplete="off"
              value={password}
              onFocus={() => setConfirmPassword('')}
              onChange={ev => {
                setPassword(ev.target.value);
                setPasswordErrorLabelVisible(false);
                setPasswordInputBorderColor(GrayLine);
                setPasswordInputHoverColor(PrimaryColor);
              }}
            />
            <InputErrorMessageStyle>
              {passwordErrorLabelVisible && passwordErrorLabelText}
            </InputErrorMessageStyle>

            <InputNameStyle>Confirmação da senha</InputNameStyle>
            <InputStyle
              borderColor={confirmPasswordInputBorderColor}
              hoverAndFocusColor={confirmPasswordInputHoverColor}
              type="password"
              placeholder="Inserir confirmação da senha"
              autoComplete="off"
              value={confirmPassword}
              onChange={ev => {
                setConfirmPassword(ev.target.value);
                setConfirmPasswordErrorLabelVisible(false);
                setConfirmPasswordInputBorderColor(GrayLine);
                setConfirmPasswordInputHoverColor(PrimaryColor);
              }}
            />
            <InputErrorMessageStyle>
              {confirmPasswordErrorLabelVisible &&
                confirmPasswordErrorLabelText}
            </InputErrorMessageStyle>

            <PrimaryButton
              type="submit"
              className="primaryButton"
              onClick={handleOnClickCadastrar}
            >
              Cadastrar empresa
            </PrimaryButton>

            <div className="politicsAndTerms">
              Ao clicar em Criar conta, eu concordo que li e aceito os{' '}
              <button type="button" className="terms" onClick={developingAlert}>
                Termos de uso
              </button>
              <p className="ea">e a</p>
              <button
                type="button"
                className="politics"
                onClick={developingAlert}
              >
                Política de privacidade.
              </button>
            </div>
          </SignupContainer>
        </SectionSubContainer>
      </SectionMainContainer>

      <Footer />
    </>
  );
};
