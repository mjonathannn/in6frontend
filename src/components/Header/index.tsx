import in6empresasLogo from 'assets/img/in6empresasLogo.svg';
import in6vagasLogo from 'assets/img/in6vagasLogo.svg';
import { useHistory } from 'react-router-dom';
import { MainContainer } from './styles';

interface HeaderProps {
  logoType: 'empresas' | 'vagas';
  redirectRoute: string;
}

export const Header: React.FC<HeaderProps> = ({ logoType, redirectRoute }) => {
  const history = useHistory();

  return (
    <MainContainer>
      <div className="subContainer">
        <button type="button" onClick={() => history.push(redirectRoute)}>
          <img
            src={logoType === 'empresas' ? in6empresasLogo : in6vagasLogo}
            alt="in6empresasLogo"
          />
        </button>
      </div>
    </MainContainer>
  );
};
