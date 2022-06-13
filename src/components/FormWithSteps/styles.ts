import { HighEmphasis } from 'assets/colors/palette';
import { Bold18Styles } from 'assets/fonts/fontStyles';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 64px;
  height: 64px;

  display: flex;
  align-items: center;

  ${Bold18Styles}
  color: ${HighEmphasis};
`;

export const MainContainer = styled.main`
  display: flex;
  padding-block: 228px 160px;
`;

export const StepContainer = styled.div`
  margin-left: 356px;
`;
