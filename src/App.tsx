import { FooterContext } from 'hooks/footer';
import { Routes } from 'routes';
import './styles/globalStyles.css';

export const App: React.FC = () => {
  return (
    <FooterContext>
      <Routes />
    </FooterContext>
  );
};
