import styled from 'styled-components';
import {
  BackgroundColor,
  ErrorDefaut,
  HighEmphasis,
  LowEmphasis,
  OutlineColor,
} from 'assets/colors/palette';
import { Regular14Styles } from 'assets/fonts/fontStyles';

interface InputNameStyleProps {
  disabled?: boolean;
}

interface InputProps {
  borderColor: string;
  hoverAndFocusColor: string;
}

export const InputStyle = styled.input<InputProps>`
  ${Regular14Styles}

  display: block;
  width: 400px;
  height: 40px;
  border-radius: 8px;
  background: ${BackgroundColor};
  border: solid 1px ${props => props.borderColor};
  color: ${HighEmphasis};
  padding: 0px 10px;
  outline: none;

  &:disabled {
    color: ${LowEmphasis};
  }

  &:not(:disabled) {
    &:focus,
    &:hover {
      border: solid 2px ${props => props.hoverAndFocusColor};
      transition: 0.1s;
    }
  }

  &::placeholder {
    color: ${OutlineColor};
  }
`;

export const InputSmallStyle = styled.input<InputProps>`
  width: 208px;
  height: 40px;
  border-radius: 8px;
  background: ${BackgroundColor};
  border: solid 1px ${props => props.borderColor};
  padding: 0px 10px;
  outline: none;
  letter-spacing: 0.75px;
  font-size: 14px;

  :hover,
  :focus {
    border: solid 2px ${props => props.hoverAndFocusColor};
    transition: 0.1s;
  }
`;

export const InputSmall2Style = styled.input<InputProps>`
  width: 188px;
  height: 40px;
  border-radius: 8px;
  background: ${BackgroundColor};
  border: solid 1px ${props => props.borderColor};
  padding: 0px 10px;
  outline: none;
  letter-spacing: 0.75px;
  font-size: 14px;

  :hover,
  :focus {
    border: solid 2px ${props => props.hoverAndFocusColor};
    transition: 0.1s;
  }
`;

export const InputNameStyle = styled.p<InputNameStyleProps>`
  margin-bottom: 10px;
  letter-spacing: 0.75px;

  color: ${({ disabled }) => (disabled ? LowEmphasis : HighEmphasis)};
`;

export const InputErrorMessageStyle = styled.div`
  width: 400px;
  height: 20px;
  margin-bottom: 5px;
  margin-top: 5px;
  font-size: 14px;

  letter-spacing: 0.75px;
  color: ${ErrorDefaut};
`;

export const InputSmallErrorMessageStyle = styled.div`
  width: 208px;
  height: 20px;
  margin-bottom: 5px;
  margin-top: 5px;
  font-size: 14px;

  label {
    letter-spacing: 0.75px;
    color: ${ErrorDefaut};
  }
`;

export const InputSmall2ErrorMessageStyle = styled.div`
  width: 188px;
  height: 20px;
  margin-bottom: 5px;
  margin-top: 5px;
  font-size: 14px;

  label {
    letter-spacing: 0.75px;
    color: ${ErrorDefaut};
  }
`;
