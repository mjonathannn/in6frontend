import { PrimaryButton, SimpleButton } from 'components/Buttons';
import { Input } from 'components/Input';
import { Loader } from 'components/Loader';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { routeStartups } from 'routes/routesAddresses';
import { GenerateInputStates } from 'utils';
import { Container, Description, Title } from './styles';

interface DeleteVacancyModalProps {
  handleCloseModal: () => void;
  handleDeleteVacancy: (password: string) => Promise<void>;
}

export const DeleteVacancyModal: React.FC<DeleteVacancyModalProps> = ({
  handleCloseModal,
  handleDeleteVacancy,
}) => {
  const history = useHistory();

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [successfullyDeleted, setSuccessfullyDeleted] = useState(false);
  const passwordStates = GenerateInputStates('password');

  const handleConfirmDelete = useCallback(async () => {
    setIsLoadingDelete(true);

    try {
      const {
        mainState: { value: password },
      } = passwordStates;

      await handleDeleteVacancy(password as string);
      setSuccessfullyDeleted(true);
    } catch {
      handleCloseModal();
      passwordStates.mainState.setFunction('');
      alert('Erro ao excluir vaga, por favor, tente novamente mais tarde.');
    } finally {
      setIsLoadingDelete(false);
    }
  }, [handleCloseModal, handleDeleteVacancy, passwordStates]);

  return (
    <Container style={{ paddingBlock: successfullyDeleted ? 0 : 20 }}>
      {isLoadingDelete ? (
        <Loader style={{ minHeight: 300 }} />
      ) : (
        <>
          <Title>
            {successfullyDeleted
              ? 'Vaga excluída com sucesso!'
              : 'Excluir vaga?'}
          </Title>

          {successfullyDeleted ? (
            <PrimaryButton
              type="button"
              className="primaryButton"
              onClick={() => history.push(routeStartups)}
            >
              Fechar
            </PrimaryButton>
          ) : (
            <>
              <Description>
                Ao confirmar a exclusão da vaga não será possível desfazer essa
                ação.
              </Description>

              <Input
                style={{ width: 279 }}
                type="password"
                placeholder="inserir senha"
                autoComplete="off"
                states={passwordStates}
              />

              <PrimaryButton
                type="button"
                className="primaryButton"
                onClick={handleConfirmDelete}
              >
                OK
              </PrimaryButton>

              <SimpleButton
                type="button"
                className="simpleButton"
                onClick={handleCloseModal}
              >
                Cancelar
              </SimpleButton>
            </>
          )}
        </>
      )}
    </Container>
  );
};
