import {
  BackgroundColor,
  GrayTitleActive,
  HighEmphasis,
  MediumEmphasis,
  OutlineColor,
  PrimaryColor,
} from 'assets/colors/palette';
import {
  Bold18Styles,
  Medium16Styles,
  Regular14Styles,
} from 'assets/fonts/fontStyles';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 50px;
  gap: 60px;
`;

export const VacancyContainer = styled.div`
  width: 540px;
  padding: 30px 24px;

  display: flex;
  flex-direction: column;
  gap: 36px;

  border: 1px solid ${OutlineColor};
  border-radius: 8px;
`;

export const VacancyName = styled.div`
  letter-spacing: 0.75px;
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  color: ${GrayTitleActive};

  margin-bottom: 20px;
`;

export const VacancyAspects = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 18px;

  &:empty {
    display: none;
  }

  div {
    width: max-content;
    padding: 12px;
    height: 48px;
    background: ${BackgroundColor};
    border: 1px solid ${PrimaryColor};
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    ${Medium16Styles}
    color: ${PrimaryColor};
  }

  img {
    width: 24px;
    height: 24px;
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
    margin-top: 2px;
  }

  p {
    ${Regular14Styles}
    line-height: 28px;
    color: ${HighEmphasis};
    position: relative;
    word-wrap: break-word;
    max-width: 450px;

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
  gap: 20px;
  color: ${HighEmphasis};
  letter-spacing: 0.75px;

  & + & {
    margin-top: 30px;
  }

  .topic-title {
    ${Bold18Styles}
  }
  .content {
    word-wrap: break-word;
    max-width: 490px;
    font-size: 14px;
    line-height: 28px;

    &:empty {
      display: none;
    }
  }
`;

export const RequirementWithDescription = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-top: -8px;
    word-wrap: break-word;
    width: 490px;
  }
`;

export const RequirementContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  ${VacancyTopic} + & {
    margin-top: 30px;
  }

  & + & {
    margin-top: 20px;
  }

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
