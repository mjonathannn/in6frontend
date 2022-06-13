import emailSuccessfully from 'assets/img/emailSuccessfully.svg';
import localTwo from 'assets/img/localTwo.svg';
import close from 'assets/img/close.svg';
import { Input } from 'components/Input';
import { InputWithIcon } from 'components/Input/InputWithIcon';
import * as yup from 'yup';

import { PrimaryButton } from 'components/Buttons';
import { useCallback } from 'react';
import { handleFormError } from 'errors/handleFormError';
import { Terms } from 'components/Terms';
import {
  GenerateInputStates,
  generateFormObjectFromStates,
  developingAlert,
} from 'utils';
import { yupRequiredStringField } from 'utils/validation';

import {
  Container,
  BannerContainer,
  CloseButton,
  InformationContainer,
  FormContainer,
} from './styles';

interface BannerNotificationProps {
  closeModal: () => void;
}

export const BannerNotification: React.FC<BannerNotificationProps> = ({
  closeModal,
}) => {
  const nameStates = GenerateInputStates('name');
  const cityStates = GenerateInputStates('city');
  const emailStates = GenerateInputStates('email');

  const handleSubmit = useCallback(async () => {
    const formStates = [nameStates, cityStates, emailStates];
    const formObject = generateFormObjectFromStates(formStates);

    try {
      const schema = yup.object().shape({
        name: yupRequiredStringField,
        city: yupRequiredStringField,
        email: yupRequiredStringField.email('Formato de e-mail incorreto'),
      });

      await schema.validate(formObject, { abortEarly: false });
      developingAlert();
    } catch (error) {
      handleFormError(error as Error | yup.ValidationError, formStates);
    }
  }, [cityStates, emailStates, nameStates]);

  return (
    <Container>
      <BannerContainer>
        <CloseButton type="button" onClick={closeModal}>
          <img src={close} alt="" />
        </CloseButton>

        <InformationContainer>
          <p className="title">Não perca nehuma oportunidade de emprego</p>

          <div className="description">
            <img src={emailSuccessfully} alt="" />
            <p>
              Inscreva-se para receber notificações em seu email quando surgirem
              novas vagas do seu interesse.
            </p>
          </div>
        </InformationContainer>

        <FormContainer>
          <Input
            name="Nome"
            placeholder="inserir primeiro nome"
            states={nameStates}
            style={{ fontSize: 16, height: 48 }}
          />
          <InputWithIcon
            name="Cidade onde mora"
            placeholder="inserir cidade"
            icon={localTwo}
            states={cityStates}
            style={{ fontSize: 16, height: 48 }}
          />
          <Input
            name="Email"
            type="email"
            placeholder="inserir email"
            states={emailStates}
            style={{ fontSize: 16, height: 48 }}
          />

          <PrimaryButton type="submit" onClick={handleSubmit}>
            Inscrever-se
          </PrimaryButton>

          <Terms />
        </FormContainer>
      </BannerContainer>
    </Container>
  );
};
