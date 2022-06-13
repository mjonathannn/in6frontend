import {
  BackgroundColor,
  GrayBackground,
  GrayPlaceHolder,
  HighEmphasis,
  LowEmphasis,
  PrimaryColor,
} from 'assets/colors/palette';
import { Regular16Styles } from 'assets/fonts/fontStyles';
import styled, { css } from 'styled-components';

interface Props {
  disabled?: boolean;
  borderColor: string;
  hoverAndFocusColor: string;
  isFileInput: boolean;
}

export const InputContainer = styled.input`
  ${Regular16Styles}

  background-color: ${BackgroundColor};
  color: ${HighEmphasis};
  width: 91%;
  height: 80%;
  outline: 0;

  &:disabled {
    color: ${LowEmphasis};
  }

  &::placeholder {
    color: ${GrayPlaceHolder};
  }
`;

export const Container = styled.div<Props>`
  width: 400px;
  height: 40px;
  border-radius: 8px;
  background: ${GrayBackground};
  border: solid 1px ${({ borderColor }) => borderColor};
  padding: 0px 10px;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.1s;
  cursor: ${({ isFileInput }) => (isFileInput ? 'pointer' : 'text')};

  ${InputContainer}[type='file'] {
    display: none;
  }
  p {
    width: 91%;
    letter-spacing: 0.75px;
    color: ${PrimaryColor};
  }
  img {
    width: 24px;
    height: 24px;
  }

  ${({ disabled, hoverAndFocusColor }) =>
    !disabled &&
    css`
      &:focus-within,
      &:hover {
        border: solid 2px ${hoverAndFocusColor};
      }
    `}
`;
