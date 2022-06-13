import { HighEmphasis, MediumEmphasis } from 'assets/colors/palette';
import { Regular14Styles, Regular24Styles } from 'assets/fonts/fontStyles';
import styled from 'styled-components';

export const TitleContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StepTitle = styled.h3`
  ${Regular24Styles}
  color: ${HighEmphasis};
`;

export const StepSubTitle = styled.p`
  ${Regular14Styles}
  line-height: 28px;
  color: ${MediumEmphasis};
`;
