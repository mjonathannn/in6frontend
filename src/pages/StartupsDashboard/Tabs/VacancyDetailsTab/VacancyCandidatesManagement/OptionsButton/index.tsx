import moreOne from 'assets/img/moreOne.svg';
import deleteIcon from 'assets/img/deleteIcon.svg';
import { useState } from 'react';
import { Container, DeleteButton, Button } from './styles';

interface OptionsButtonProps {
  handleDeleteCandidate: () => void;
}

export const OptionsButton: React.FC<OptionsButtonProps> = ({
  handleDeleteCandidate,
}) => {
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  return (
    <Container deleteButtonIsVisible={isDeleteButtonVisible}>
      <DeleteButton type="button" onClick={handleDeleteCandidate}>
        <img src={deleteIcon} alt="Lixeira" />
        Excluir candidato
      </DeleteButton>

      <Button
        type="button"
        onClick={() => setIsDeleteButtonVisible(value => !value)}
        onBlur={() => setIsDeleteButtonVisible(false)}
      >
        <img src={moreOne} alt="Três pontos" />
      </Button>
    </Container>
  );
};
