import styled from 'styled-components';
import {
  GrayTitleActive,
  PrimaryColor,
  MediumEmphasis,
  BackgroundColor,
  HighEmphasis,
  OutlineColor,
} from 'assets/colors/palette';
import { Bold18Styles } from 'assets/fonts/fontStyles';

export const MainContainer = styled.div`
  width: 1246px;
  background: ${BackgroundColor};

  margin-inline: auto;
  padding-bottom: 78px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .buttonSalvar {
    float: right;
  }
`;

export const Header = styled.header`
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;

  ${Bold18Styles}
  color: ${HighEmphasis};
`;

export const Title = styled.h3`
  color: ${GrayTitleActive};
  margin-bottom: 20px;
  font-size: 24px;
  line-height: 38px;
  font-weight: 400;
`;

export const ConfigurationSection = styled.section`
  width: 412px;
  padding: 30px 5px;
  letter-spacing: 0.75px;
  font-weight: 400;

  & + & {
    border-top: solid 1px ${OutlineColor};
  }

  button[type='submit'] {
    margin-top: 8px;
  }

  .email {
    color: ${PrimaryColor};
    line-height: 34px;
    margin-bottom: 30px;
  }

  .description {
    margin-bottom: 25px;
    color: ${MediumEmphasis};
    line-height: 28px;
  }

  .switchs-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  }
`;
