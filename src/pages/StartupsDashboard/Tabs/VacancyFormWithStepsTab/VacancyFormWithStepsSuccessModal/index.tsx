import partyPopper from 'assets/img/partyPopper.svg';
import { Container, SubContainer } from './styles';

interface VacancyFormWithStepsSuccessModalProps {
  isVisible: boolean;
  handleRedirectToVacancy: () => void;
  isEditFormSuccessModal?: boolean;
}

export const VacancyFormWithStepsSuccessModal: React.FC<
  VacancyFormWithStepsSuccessModalProps
> = ({ isVisible, handleRedirectToVacancy, isEditFormSuccessModal }) => {
  return (
    <Container isVisible={isVisible}>
      <SubContainer>
        <img src={partyPopper} alt="Popper de aniversário" />

        <span id="success-message-title">
          {isEditFormSuccessModal ? 'Vaga atualizada' : 'Nova vaga criada'}
        </span>
        <span id="success-message-description">
          {isEditFormSuccessModal
            ? 'Sua vaga foi atualizada e já exibirá as novas informações'
            : 'Sua vaga foi publicada, e já pode receber o currículo dos candidatos'}
        </span>

        <button type="button" onClick={handleRedirectToVacancy}>
          Abrir vaga
        </button>
      </SubContainer>
    </Container>
  );
};
