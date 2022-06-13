import { BackgroundColor, GradientPrimary } from 'assets/colors/palette';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${BackgroundColor};

  div {
    text-align: start;
    background: ${GradientPrimary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.75px;
  }
`;
