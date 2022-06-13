import styled from 'styled-components';
import {
  OutlineColor,
  GradientPrimary,
  LowEmphasis,
} from 'assets/colors/palette';
import { Medium16Styles } from 'assets/fonts/fontStyles';

export const SecondaryButton = styled.button`
  ${Medium16Styles}

  border-radius: 48px;
  padding: 16px 32px;
  border-style: solid;
  border: solid 1px ${OutlineColor};
  transition: 0.2s;

  position: relative;
  background: ${GradientPrimary};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:after {
    content: '';
    opacity: 0;

    width: 100%;
    height: 100%;
    position: absolute;

    top: -1px;
    left: -1px;

    border-radius: 48px;
    border: 1px solid transparent;
    background: ${GradientPrimary} border-box;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    transition: 0.2s;
  }

  &:not(:disabled) {
    &:hover,
    &:active {
      &:after {
        opacity: 1;
      }
    }
  }

  &:disabled {
    cursor: auto;
    background: ${LowEmphasis};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
