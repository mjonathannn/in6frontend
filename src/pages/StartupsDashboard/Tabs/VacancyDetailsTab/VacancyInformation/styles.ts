import styled, { css } from 'styled-components';
import {
  BackgroundColor,
  GradientPrimary,
  GrayBackground,
  HighEmphasis,
  MediumEmphasis,
  OutlineColor,
} from 'assets/colors/palette';
import {
  Bold14Styles,
  Bold16Styles,
  Bold32Styles,
  Medium14Styles,
  Medium16Styles,
  Regular14Styles,
  Regular16Styles,
} from 'assets/fonts/fontStyles';

interface VacancyPostContainerProps {
  disabled: boolean;
}

interface VacancyStyleProps {
  colors: {
    low: string;
    high: string;
  };
}

export const VacancyStatusDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 12px 24px;
  border-radius: 24px;

  span {
    ${Medium14Styles};
    color: ${BackgroundColor};
  }

  img {
    filter: invert(95%) sepia(100%) saturate(0%) hue-rotate(155deg)
      brightness(106%) contrast(107%);
  }
`;

export const VacancyPeriod = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    ${Bold14Styles};
  }
  p {
    ${Regular16Styles};
  }
`;

export const VacancyStatusBar = styled.div<VacancyStyleProps>`
  position: absolute;
  width: 100%;
  padding: 8px 20px;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ colors: { low, high } }) => css`
    background: ${low};

    .switch {
      gap: 8px;

      p {
        ${Medium16Styles}
        color: ${high};
      }
    }

    ${VacancyStatusDate} {
      background: ${high};
    }

    ${VacancyPeriod} {
      color: ${high};
    }
  `}
`;

export const VacancyDateInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const MainContainer = styled.div`
  padding-top: 120px;
`;

export const LineTitle = styled.span`
  color: ${MediumEmphasis};
  min-width: 248px;
`;

export const VacancyDataContainer = styled.section`
  ${Regular14Styles}
  color: ${HighEmphasis};
  line-height: 28px;

  width: 752px;

  border: solid 1px ${OutlineColor};
  border-radius: 8px;
  padding: 20px 22px 8px;
  margin-bottom: 30px;

  p,
  ${LineTitle} {
    padding: 9px 0;
  }

  p {
    word-wrap: break-word;
  }
`;

export const VacancyDataContainerTitle = styled.h3`
  ${Bold16Styles}
  margin-bottom: 14px;
`;

export const DataLine = styled.div`
  display: flex;

  p {
    word-wrap: break-word;
    max-width: 100%;
  }

  & + & {
    border-top: solid 1px ${OutlineColor};
  }
`;

export const RequirementsListContainer = styled.div`
  display: flex;
  gap: 14px;
  flex-flow: wrap;
  padding: 14px 0;
`;

export const RequirementDescription = styled.div`
  position: absolute;
  width: 300px;
  max-width: 300px;
  word-wrap: break-word;
  font-size: 12px;

  padding: 12px 16px;
  text-align: center;

  background: ${GrayBackground};
  border: 1px solid ${OutlineColor};
  border-radius: 8px;

  bottom: 120%;
  left: 50%;
  margin-left: -150px;

  visibility: hidden;
  opacity: 0;

  transition: 0.5s;

  &:hover {
    visibility: visible;
    opacity: 1;
  }
`;

export const Requirement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${OutlineColor};
  border-radius: 8px;
  padding-inline: 16px;
  height: 50px;
  position: relative;

  &:hover {
    ${RequirementDescription} {
      visibility: visible;
      opacity: 1;
    }
  }

  span {
    ${Medium16Styles}
    line-height: 18px;

    background: ${GradientPrimary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const VacancySpecificationsContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 12px;

  height: 76px;
  margin: 22px 0;
`;

export const VacancySpecification = styled.div`
  max-width: 282px;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;

  font-weight: 500;
  font-size: 10px;
  line-height: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkContainer = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  margin-top: auto;

  p {
    max-width: 210px;
  }

  p + p {
    margin-top: 8px;
  }

  #vacancy-link {
    font-weight: 500;
  }
`;

export const MoreDetailsContainer = styled.div`
  position: absolute;
  bottom: -64px;
  right: -40px;

  width: 158px;
  height: 158px;
  border-radius: 50%;

  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: right;

  display: flex;
  align-items: center;
  gap: 4px;

  span,
  svg {
    margin-bottom: 50px;
  }

  span {
    width: 70px;
    margin-left: 8px;
  }
`;

export const VacancyPost = styled.div<VacancyStyleProps>`
  width: 360px;
  height: 360px;
  padding: 26px 24px;

  border-radius: 8px;
  position: relative;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  letter-spacing: 0.75px;
  overflow: hidden;

  span,
  small {
    font-weight: 500;
  }

  span {
    font-size: 12px;
    line-height: 12px;
  }

  small {
    font-size: 10px;
    line-height: 16px;
  }

  h1 {
    ${Bold32Styles}
    letter-spacing: 0.75px;
    line-height: 40px;
    margin: 4px 0 10px;
  }

  ${({ colors: { low, high } }) => css`
    background: ${low};
    color: ${high};

    ${VacancySpecification} {
      border: 1px solid ${high};
    }

    ${MoreDetailsContainer} {
      background: ${low};

      svg {
        color: ${high};
      }
    }
  `}
`;

export const VacancyPostDescription = styled.p`
  width: 360px;
  font-weight: 400;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.75px;

  color: ${HighEmphasis};
`;

export const PostActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const VacancyPostContainer = styled.div<VacancyPostContainerProps>`
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${VacancyPost}, ${VacancyPostDescription} {
    opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
  }

  ${PostActionButtonsContainer} {
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  }
`;
