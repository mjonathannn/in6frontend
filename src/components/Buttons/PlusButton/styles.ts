import styled, { css } from 'styled-components';

interface ContainerProps {
  isOutlineStyle: boolean;
}

export const Container = styled.div<ContainerProps>`
  button {
    padding: 12px 32px;

    display: flex;
    align-items: center;
    gap: 8px;

    ${({ isOutlineStyle }) =>
      isOutlineStyle &&
      css`
        img {
          filter: invert(52%) sepia(75%) saturate(6314%) hue-rotate(0deg)
            brightness(103%) contrast(107%);
        }
      `}

    &:disabled {
      img {
        filter: invert(64%) sepia(13%) saturate(0%) hue-rotate(288deg)
          brightness(96%) contrast(91%);
        opacity: 0.6;
      }
    }
  }
`;
