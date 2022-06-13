import { MediumEmphasis } from 'assets/colors/palette';
import { Bold14Styles } from 'assets/fonts/fontStyles';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 60px;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & > span {
    ${Bold14Styles}
    color: ${MediumEmphasis};

    text-align: start;
    width: 100%;
  }
`;
