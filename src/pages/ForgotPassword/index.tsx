import {
  InputNameStyle,
  InputStyle,
  InputErrorMessageStyle,
} from 'components/Input/styles';
import { GrayLine, ErrorDefaut, PrimaryColor } from 'assets/colors/palette';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import check from 'assets/img/check.svg';
import number1 from 'assets/img/number1.svg';
import number2 from 'assets/img/number2.svg';
import number3 from 'assets/img/number3.svg';
import { developingAlert } from 'utils';
import { COMPANY_NAME, COMPANY_PRODUCT_NAME_1 } from 'constants/company';
import { routeBar, routeLogin } from 'routes/routesAddresses';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { PrimaryButton } from 'components/Buttons';
import { existsEmail as verifyExistsEmail } from 'services/companyServices';
import { emailIsValid } from 'utils/validation';
import {
  SectionMainContainerPage1,
  SectionSubContainerPage1,
  SectionMainContainerPage2,
  SectionSubContainerPage2,
  Form,
  Title,
  Description,
} from './styles';

export const ForgotPassword: React.FC = () => {
  document.title = `Recuperar Senha - ${COMPANY_NAME} ${COMPANY_PRODUCT_NAME_1}`;
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [inputBorder, setInputBorder] = useState(GrayLine);
  const [inputHoverAndFocus, setInputHoverAndFocus] = useState(PrimaryColor);
  const [errorLabelText, setErrorLabelText] = useState('');
  const [errorLabelVisible, setErrorLabelVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOnClickEnviarEmail = async () => {
    if (email.length !== 0) {
      if (emailIsValid(email)) {
        const existsEmail = await verifyExistsEmail(email);

        if (existsEmail) {
          developingAlert();
          setCurrentPage(2);
        } else {
          setErrorLabelText('Não existe uma conta com esse email');
          setErrorLabelVisible(true);
          setInputBorder(ErrorDefaut);
          setInputHoverAndFocus(ErrorDefaut);
        }
      } else {
        setErrorLabelText('Insira um email válido');
        setErrorLabelVisible(true);
        setInputBorder(ErrorDefaut);
        setInputHoverAndFocus(ErrorDefaut);
      }
    } else {
      setErrorLabelText('Campo obrigatório');
      setErrorLabelVisible(true);
      setInputBorder(ErrorDefaut);
      setInputHoverAndFocus(ErrorDefaut);
    }
  };

  const Page1 = () => {
    return (
      <>
        <SectionMainContainerPage1>
          <SectionSubContainerPage1>
            <Form>
              <Title>Esqueceu a senha?</Title>

              <Description>
                Insira o endereço de email associado à sua conta que <br />
                lhe enviaremos um link de redefinição de senha
              </Description>

              <InputNameStyle>Email</InputNameStyle>
              <InputStyle
                borderColor={inputBorder}
                hoverAndFocusColor={inputHoverAndFocus}
                placeholder="Inserir email"
                autoComplete="off"
                value={email}
                autoFocus
                onChange={ev => {
                  setEmail(ev.target.value);
                  setErrorLabelVisible(false);
                  setInputBorder(GrayLine);
                  setInputHoverAndFocus(PrimaryColor);
                }}
              />
              <InputErrorMessageStyle>
                {errorLabelVisible && errorLabelText}
              </InputErrorMessageStyle>

              <PrimaryButton
                type="submit"
                className="primaryButton"
                onClick={handleOnClickEnviarEmail}
              >
                Enviar email de redefinição de senha
              </PrimaryButton>
            </Form>
          </SectionSubContainerPage1>
        </SectionMainContainerPage1>

        <Footer />
      </>
    );
  };
  const Page2 = () => {
    return (
      <>
        <SectionMainContainerPage2>
          <SectionSubContainerPage2>
            <img className="check" src={check} alt="" />

            <p className="description">
              Um link para redefinir sua senha foi enviado
              <br />
              para seu email. Siga as instruções abaixo.
            </p>

            <img className="number1" src={number1} alt="" width={36} />
            <p className="steps">Acesse o email</p>
            <p className="email">{email !== '' ? email : '--------'}</p>

            <img className="number2" src={number2} alt="" width={36} />
            <p className="steps">Abra a nossa mensagem</p>

            <img className="number3" src={number3} alt="" width={36} />
            <p className="steps">Clique no link para criar uma nova senha</p>

            <PrimaryButton
              type="button"
              className="primaryButton"
              onClick={() => {
                history.push(routeLogin);
              }}
            >
              Voltar para a página de acesso &#10132;
            </PrimaryButton>
          </SectionSubContainerPage2>
        </SectionMainContainerPage2>

        <Footer />
      </>
    );
  };

  return (
    <>
      <Header logoType="empresas" redirectRoute={routeBar} />

      {currentPage === 1 && Page1()}
      {currentPage === 2 && Page2()}
    </>
  );
};
