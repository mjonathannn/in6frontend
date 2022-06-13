import { Container } from './styles';

interface ModalProps {
  isVisible: boolean;
}

export const Modal: React.FC<ModalProps> = ({ children, isVisible }) => {
  return <Container isVisible={isVisible}>{children}</Container>;
};
