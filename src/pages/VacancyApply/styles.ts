import {
  GrayBackground,
  GrayBody,
  MediumEmphasis,
  GrayLine,
  GrayTitleActive,
  PrimaryColor,
  HighEmphasis,
  BackgroundColor,
  OutlineColor,
} from 'assets/colors/palette';
import {
  Bold18Styles,
  Medium16Styles,
  Regular14Styles,
} from 'assets/fonts/fontStyles';
import { PrimaryButton } from 'components/Buttons';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 60px;

  display: flex;
  justify-content: center;
  padding-bottom: 110px;
  gap: 6%;
`;

export const VacancyContainer = styled.div`
  width: 744px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  img {
    width: 96px;
    height: 96px;
    border-radius: 48px;
  }
  aside p {
    font-size: 14px;
    line-height: 26px;
    letter-spacing: 0.75px;
    text-align: right;
    color: ${MediumEmphasis};
  }
`;

export const TitleContainer = styled.div`
  letter-spacing: 0.75px;

  .vacancyTitle {
    font-size: 24px;
    line-height: 24px;
    font-weight: 700;
    color: ${GrayTitleActive};
  }
  .companyName {
    font-size: 18px;
    line-height: 34px;
    color: ${PrimaryColor};
    font-weight: 400;
  }
`;

export const VacancyAspects = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;

  div {
    display: flex;
    align-items: center;
    gap: 8px;

    height: 32px;
    border: 1px solid ${PrimaryColor};
    border-radius: 48px;
    padding: 0 10px;

    small {
      font-size: 14px;
      font-weight: bold;
      line-height: 24px;
      letter-spacing: 0.75px;
      color: ${PrimaryColor};
    }
  }
`;

export const VacancyData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 10px;
`;

export const VacancyDataLine = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;

  img {
    margin-top: 4px;
  }

  p {
    font-size: 14px;
    line-height: 32px;
    letter-spacing: 0.75px;
    color: ${HighEmphasis};
    position: relative;

    & + p {
      margin-left: 4px;
    }

    & + p:after {
      content: '';
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: ${HighEmphasis};
      left: -12px;
      bottom: 42%;
    }
  }
`;

export const VacancyTopic = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: ${HighEmphasis};
  letter-spacing: 0.75px;
  margin-bottom: 30px;

  .topic-title {
    ${Bold18Styles}
  }
  .content {
    font-size: 14px;
    line-height: 32px;
  }
`;

export const RequirementWithDescription = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-top: -8px;
    word-wrap: break-word;
    width: 100%;
  }
`;

export const RequirementContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 30px;

  div {
    display: flex;
    gap: 22px;
    flex-flow: wrap;

    p {
      ${Regular14Styles}
      line-height: 28px;
      color: ${HighEmphasis};
      margin-bottom: 8px;
    }
  }
  span {
    ${Medium16Styles}
    color: ${MediumEmphasis}
  }
`;

export const Requirement = styled.div`
  width: fit-content;
  padding: 12px;
  height: 48px;
  background: ${BackgroundColor};
  border: 1px solid ${OutlineColor};
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  ${Medium16Styles}
  color: ${PrimaryColor};
`;

export const ApplyContainer = styled.div`
  width: 440px;
  height: 1345px;
  background-color: ${GrayBackground};
  border: 1px solid ${GrayLine};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${PrimaryButton} {
    width: 400px;
    margin: 30px 0 16px;
  }
  .form-title {
    margin: 14px 0 20px;
    width: 400px;
    text-align: start;

    font-weight: 400;
    font-size: 24px;
    line-height: 38px;
    letter-spacing: 0.75px;
    color: ${GrayBody};
  }
`;
