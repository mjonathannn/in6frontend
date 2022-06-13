import {
  BackgroundColor,
  HighEmphasis,
  LowEmphasis,
  MediumEmphasis,
  OutlineColor,
} from 'assets/colors/palette';
import { Regular14Styles } from 'assets/fonts/fontStyles';
import styled from 'styled-components';

interface TextAreaProps {
  borderColor: string;
  hoverAndFocusColor: string;
}

export const TextArea = styled.textarea<TextAreaProps>`
  ${Regular14Styles}

  display: block;
  width: 400px;
  border-radius: 8px;
  background: ${BackgroundColor};
  border: solid 1px ${props => props.borderColor};
  color: ${HighEmphasis};
  padding: 14px;
  outline: none;
  min-height: 144px;

  resize: none;
  overflow-y: hidden;

  &:disabled {
    color: ${LowEmphasis};
  }

  &:not(:disabled) {
    &:focus,
    &:hover,
    &:active {
      border: solid 2px ${props => props.hoverAndFocusColor};
      transition: 0.1s;
    }
  }

  &::placeholder {
    color: ${OutlineColor};
  }
`;

export const TextAreaDescription = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.75px;

  .input-description {
    color: ${MediumEmphasis};
  }

  .characters-counter {
    color: ${HighEmphasis};
  }
`;
