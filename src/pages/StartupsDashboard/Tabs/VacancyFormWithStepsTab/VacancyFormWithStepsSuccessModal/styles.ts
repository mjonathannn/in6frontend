import {
  BackgroundColor,
  GradientPrimary,
  HighEmphasis,
  MediumEmphasis,
} from 'assets/colors/palette';
import {
  Bold18Styles,
  Medium14Styles,
  Medium16Styles,
} from 'assets/fonts/fontStyles';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isVisible: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(33, 33, 33, 0.5);
  backdrop-filter: blur(2px);

  z-index: 2;
  transition: 0.5s;

  ${({ isVisible }) =>
    isVisible
      ? css`
          visibility: visible;
          opacity: 1;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `}
`;

export const SubContainer = styled.div`
  width: 312px;
  height: 236px;
  padding-block: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  gap: 8px;
  background: ${BackgroundColor};
  border-radius: 24px;

  img {
    width: 36px;
    height: 36px;
  }

  button {
    ${Medium16Styles}
    height: 20px;

    background: ${GradientPrimary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: 0.2s;

    &:hover {
      font-size: 17px;
    }
  }

  #success-message-title {
    ${Bold18Styles}
    color: ${HighEmphasis};
  }

  #success-message-description {
    ${Medium14Styles}
    line-height: 21px;
    text-align: center;
    color: ${MediumEmphasis};

    width: 260px;
  }
`;
