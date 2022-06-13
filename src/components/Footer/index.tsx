import { useFooter } from 'hooks/footer';
import { useLayoutEffect, useState } from 'react';

import { MainContainer } from './styles';

interface FooterProps {
  contentWidth?: string;
}

export const Footer: React.FC<FooterProps> = ({ contentWidth = '1200px' }) => {
  const { footerUpdateData, alternativeFooterComponent, isFooterVisible } =
    useFooter();
  const [windowHeights, setWindowHeights] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateHeight = () => {
      const { scrollHeight } = document.body;
      const { innerHeight } = window;

      setWindowHeights([scrollHeight, innerHeight]);
    };

    window.addEventListener('resize', updateHeight);
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  }, [footerUpdateData]);

  if (!isFooterVisible) return null;
  return (
    <MainContainer
      position={windowHeights[0] <= windowHeights[1] ? 'absolute' : 'relative'}
      contentWidth={contentWidth}
    >
      {alternativeFooterComponent || (
        <div className="content">
          <p>© 2022 IN6 Tecnologia em Recrutamento I.S.</p>

          <ul>
            <li>
              <a href="/">Central de ajuda</a>
            </li>
            <li>
              <a href="/">Termos de uso</a>
            </li>
            <li>
              <a href="/">Política de privacidade</a>
            </li>
          </ul>
        </div>
      )}
    </MainContainer>
  );
};
