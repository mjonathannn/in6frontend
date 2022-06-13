import { developingAlert } from 'utils';
import { Container, TermsButton } from './styles';

export const Terms: React.FC = () => (
  <Container>
    Ao clicar em Inscrever-se, eu concordo que li e aceito os{' '}
    <TermsButton type="button" className="custom" onClick={developingAlert}>
      Termos de uso
    </TermsButton>{' '}
    e a{' '}
    <TermsButton type="button" className="custom" onClick={developingAlert}>
      Política de privacidade
    </TermsButton>
    .
  </Container>
);
