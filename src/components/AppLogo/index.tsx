import in6Logo from 'assets/img/in6Logo.svg';

import { Container } from './styles';

interface AppLogoProps {
  logoType: 'startups' | 'investidores' | 'candidatos';
}

export const AppLogo: React.FC<AppLogoProps> = ({ logoType }) => {
  return (
    <Container>
      <img src={in6Logo} alt="Logo" />

      <div>
        <p>para</p>
        <strong className="logo">{logoType}</strong>
      </div>
    </Container>
  );
};
