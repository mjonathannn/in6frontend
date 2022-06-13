import styled from 'styled-components';
import { HighEmphasis, LowEmphasis } from 'assets/colors/palette';
import { Medium16Styles } from 'assets/fonts/fontStyles';

export const SimpleButton = styled.button`
  ${Medium16Styles}

  background: transparent;
  border-radius: 100px;
  color: ${HighEmphasis};
  padding: 16px 12px;
  transition: 0.2s;

  &:not(:disabled) {
    &:hover,
    &:active {
      background: rgba(220, 220, 220, 0.2);
    }
  }

  &:disabled {
    color: ${LowEmphasis};
    cursor: auto;
  }
`;
