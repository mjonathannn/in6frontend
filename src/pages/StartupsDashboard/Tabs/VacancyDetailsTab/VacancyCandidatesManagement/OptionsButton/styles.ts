import { Error500 } from 'assets/colors/palette';
import styled, { css } from 'styled-components';

interface ContainerProps {
  deleteButtonIsVisible: boolean;
}

export const DeleteButton = styled.button`
  position: absolute;
  right: 34px;
  background: #fff;
  outline: 0;
  border: 1px solid ${Error500};

  width: 199px;
  height: 48px;
  border-radius: 8px;
  outline: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.75px;
  color: ${Error500};
  transition: 0.8s;

  img {
    filter: invert(33%) sepia(100%) saturate(4148%) hue-rotate(338deg)
      brightness(93%) contrast(119%);
  }
`;

export const Container = styled.div<ContainerProps>`
  position: absolute;
  height: 100%;

  display: flex;
  align-items: center;
  gap: 10px;

  right: 10px;
  bottom: 0;

  ${DeleteButton} {
    ${({ deleteButtonIsVisible }) =>
      deleteButtonIsVisible
        ? css`
            opacity: 1;
            right: 36px;
            visibility: visible;
          `
        : css`
            visibility: hidden;
            opacity: 0;
            right: 30px;
          `}
  }
`;

export const Button = styled.button`
  background: transparent;
  outline: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;
