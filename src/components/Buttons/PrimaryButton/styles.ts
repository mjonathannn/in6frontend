import styled from 'styled-components';
import {
  PrimaryColor,
  GradientPrimary,
  OutlineColor,
  LowEmphasis,
  BackgroundColor,
} from 'assets/colors/palette';
import { Medium16Styles } from 'assets/fonts/fontStyles';

export const PrimaryButton = styled.button`
  ${Medium16Styles}

  background: ${GradientPrimary};
  border-radius: 100px;
  color: ${BackgroundColor};
  padding: 16px 32px;

  &:not(:disabled) {
    &:hover,
    &:active {
      background: ${PrimaryColor};
    }
  }

  &:disabled {
    cursor: auto;
    background: ${OutlineColor};
    color: ${LowEmphasis};
  }
`;
