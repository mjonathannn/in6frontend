import { PrimaryButton } from 'components/Buttons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Switch } from 'components/Switch';
import {
  authenticateCompany,
  updateCompany,
  updateCompanyEmail,
  updateCompanyPassword,
} from 'services/companyServices';
import { yupRequiredStringField } from 'utils/validation';
import { useStartup } from 'hooks/startup';
import { generateFormObjectFromStates, GenerateInputStates } from 'utils';
import { Input } from 'components/Input';
import * as yup from 'yup';
import { handleFormError } from 'errors/handleFormError';
import { MainContainer, Header, Title, ConfigurationSection } from './styles';

interface INotifications {
  desktopNotifications: boolean;
  emailNotifications: boolean;
  whatsappNotifications: boolean;
}

export const AccountConfigurationTab: React.FC = () => {
  const { startupData } = useStartup();
  const history = useHistory();

  const notifications: INotifications = useMemo(
    () => JSON.parse(localStorage.getItem('notifications') ?? ''),
    [],
  );

  const newEmailStates = GenerateInputStates('newEmail');
  const currentPasswordStates = GenerateInputStates('currentPassword');
  const newPasswordStates = GenerateInputStates('newPassword');
  const confirmNewPasswordStates = GenerateInputStates('confirmNewPassword');

  const emailNotificationsState = useState(
    notifications.emailNotifications ?? false,
  );
  const desktopNotificationsState = useState(
    notifications.desktopNotifications ?? false,
  );
  const whatsappNotificationsState = useState(
    notifications.whatsappNotifications ?? false,
  );

  const handleAccountDataChange = useCallback(() => {
    localStorage.clear();
    alert('Será necessário fazer login novamente.');
    history.push('/login');
  }, [history]);

  const handleOnClickSaveEmail = useCallback(async () => {
    const schema = yup.object().shape({
      newEmail: yupRequiredStringField
        .email('Insira um email válido')
        .notOneOf(
          [startupData.email],
          'O novo email não pode ser igual ao atual',
        ),
    });

    try {
      const newEmail = newEmailStates.mainState.value as string;
      await schema.validate({ newEmail }, { abortEarly: false });
      await updateCompanyEmail(startupData.email, newEmail);

      handleAccountDataChange();
    } catch (error) {
      handleFormError(error as Error | yup.ValidationError, [newEmailStates]);
    }
  }, [handleAccountDataChange, newEmailStates, startupData.email]);

  const handleOnClickSaveSecurity = useCallback(async () => {
    const formStates = [
      currentPasswordStates,
      newPasswordStates,
      confirmNewPasswordStates,
    ];

    const formObject = generateFormObjectFromStates(formStates);
    const schema = yup.object().shape({
      currentPassword: yupRequiredStringField,
      newPassword: yupRequiredStringField
        .min(8, 'A senha precisa ter no mínimo 8 caracteres')
        .notOneOf(
          [yup.ref('currentPassword')],
          'A nova senha não pode ser igual a atual',
        ),
      confirmNewPassword: yupRequiredStringField.oneOf(
        [yup.ref('newPassword')],
        'As senhas inseridas não conferem',
      ),
    });

    try {
      await schema.validate(formObject, { abortEarly: false });
      await authenticateCompany({
        email: startupData.email,
        password: currentPasswordStates.mainState.value as string,
      });

      await updateCompanyPassword({
        email: startupData.email,
        password: newPasswordStates.mainState.value as string,
      });

      handleAccountDataChange();
    } catch (error) {
      formStates.forEach(({ mainState: { setFunction } }) => setFunction(''));

      if ((error as Error).message.includes('403')) {
        currentPasswordStates.errorMessageState.setFunction('Senha incorreta');
        return;
      }

      handleFormError(error as Error | yup.ValidationError, formStates);
    }
  }, [
    confirmNewPasswordStates,
    currentPasswordStates,
    handleAccountDataChange,
    newPasswordStates,
    startupData.email,
  ]);

  useEffect(() => {
    const [emailNotifications] = emailNotificationsState;
    const [desktopNotifications] = desktopNotificationsState;
    const [whatsappNotifications] = whatsappNotificationsState;

    const {
      desktopNotifications: findedDesktopNotification,
      emailNotifications: findedEmailNotification,
      whatsappNotifications: findedWhatsappNotification,
    } = JSON.parse(
      localStorage.getItem('notifications') ?? '',
    ) as INotifications;

    if (
      emailNotifications === !!findedDesktopNotification &&
      desktopNotifications === !!findedEmailNotification &&
      whatsappNotifications === !!findedWhatsappNotification
    ) {
      return;
    }

    updateCompany({
      ...startupData,
      desktopNotifications,
      emailNotifications,
      whatsappNotifications,
    }).then(status => {
      if (status !== 200) {
        alert('Algo deu errado.');
        return;
      }

      localStorage.setItem(
        'notifications',
        JSON.stringify({
          emailNotifications,
          desktopNotifications,
          whatsappNotifications,
        }),
      );

      alert('Alterações salvas com sucesso!');
    });
  }, [
    desktopNotificationsState,
    emailNotificationsState,
    notifications,
    startupData,
    whatsappNotificationsState,
  ]);

  return (
    <MainContainer>
      <Header>Configurações da conta</Header>

      <ConfigurationSection>
        <Title>Email</Title>

        <p>Seu endereço de email atual é:</p>
        <p className="email">{startupData.email}</p>

        <Input
          name="Novo endereço de email"
          states={newEmailStates}
          type="email"
          placeholder="Digite um novo endereço de email"
          autoComplete="off"
        />

        <PrimaryButton
          type="submit"
          className="buttonSalvar"
          onClick={handleOnClickSaveEmail}
        >
          Salvar alterações
        </PrimaryButton>
      </ConfigurationSection>

      <ConfigurationSection>
        <Title>Segurança</Title>

        <p className="description">
          Altere sua senha de acesso no IN6 Empresas
        </p>

        <Input
          name="Senha atual"
          states={currentPasswordStates}
          placeholder="Digite a senha atual"
          type="password"
        />

        <Input
          name="Nova senha"
          states={newPasswordStates}
          placeholder="Digite a nova senha"
          type="password"
        />

        <Input
          name="Confirmação da nova senha"
          states={confirmNewPasswordStates}
          placeholder="Digite a confirmação da senha"
          type="password"
        />

        <PrimaryButton
          type="submit"
          className="buttonSalvar"
          onClick={handleOnClickSaveSecurity}
        >
          Salvar alterações
        </PrimaryButton>
      </ConfigurationSection>

      <ConfigurationSection>
        <Title>Notificações</Title>

        <div className="switchs-container">
          <Switch
            name="Receber noticações no email"
            state={emailNotificationsState}
          />

          <Switch
            name="Permitir notificações na área de trabalho"
            state={desktopNotificationsState}
          />

          <Switch
            name="Receber notificações no WhatsApp"
            state={whatsappNotificationsState}
          />
        </div>
      </ConfigurationSection>
    </MainContainer>
  );
};
