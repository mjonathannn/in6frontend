import {
  GradientPrimary,
  LowEmphasis,
  MediumEmphasis,
  PrimaryColor,
} from 'assets/colors/palette';
import { Regular14Styles } from 'assets/fonts/fontStyles';
import styled, { css } from 'styled-components';

interface StepButtonProps {
  isSelectedStep: boolean;
}

export const Container = styled.aside`
  position: fixed;

  width: 196px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 22px;
`;

export const StepButton = styled.button<StepButtonProps>`
  ${Regular14Styles}
  color: ${MediumEmphasis};
  line-height: 16px;
  background: transparent;
  transition: 0.2s;

  span {
    font-size: 12px;
    color: ${LowEmphasis};
  }

  &:not(:disabled):hover {
    color: ${PrimaryColor};

    span {
      color: ${PrimaryColor};
    }
  }

  &:disabled {
    color: ${LowEmphasis};
    cursor: auto;
  }

  ${({ isSelectedStep }) =>
    isSelectedStep &&
    css`
      background: ${GradientPrimary};
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `}
`;
