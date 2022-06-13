import { Depth4 } from 'assets/colors/boxShadows';
import {
  BackgroundColor,
  HighEmphasis,
  MediumEmphasis,
  OutlineColor,
  PrimaryColor,
} from 'assets/colors/palette';
import {
  Bold14Styles,
  Bold18Styles,
  Medium14Styles,
  Medium16Styles,
  Regular14Styles,
  Regular24Styles,
} from 'assets/fonts/fontStyles';
import styled, { css } from 'styled-components';

interface SearchVacanciesInputProps {
  disabled: boolean;
}

interface VacanciesContainerProps {
  colors: {
    low: string;
    high: string;
  };
}

export const Container = styled.div`
  width: 1246px;
  margin-inline: auto;
`;

export const Header = styled.header`
  width: 100%;
  height: 128px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CompanyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  .welcome-message {
    display: flex;
    align-items: center;
    gap: 8px;

    h3 {
      ${Regular24Styles}
      color: ${HighEmphasis};
    }
  }

  span {
    ${Regular14Styles}
    color: ${MediumEmphasis};
  }
`;

export const VacanciesActionsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const SearchVacanciesInput = styled.div<SearchVacanciesInputProps>`
  display: flex;
  gap: 12px;
  padding-left: 32px;
  align-items: center;

  width: 244px;
  height: 48px;

  border: 1px solid ${OutlineColor};
  border-radius: 100px;
  background: ${BackgroundColor};
  transition: 0.2s;

  input {
    ${Medium16Styles}

    color: ${PrimaryColor};
    width: calc(100% - 52px);
    height: 100%;
    border-radius: 100px;
    outline: 0;

    &:disabled {
      background: ${BackgroundColor};
    }

    &::placeholder {
      color: ${({ disabled }) => (disabled ? OutlineColor : PrimaryColor)};
    }
  }

  img {
    width: 24px;
    height: 24px;

    ${({ disabled }) =>
      disabled
        ? css`
            filter: invert(100%) sepia(0%) saturate(1142%) hue-rotate(319deg)
              brightness(104%) contrast(73%);
            opacity: 0.2;
          `
        : css`
            filter: invert(52%) sepia(75%) saturate(6314%) hue-rotate(0deg)
              brightness(103%) contrast(107%);
          `}
  }

  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: text;

      &:hover,
      &:focus-within {
        border-color: ${PrimaryColor};
      }
    `}
`;

export const Main = styled.main`
  margin-top: 68px;
`;

export const VacanciesContainerStatus = styled.div`
  ${Bold14Styles}

  padding: 0 34px;
  height: 46px;
  border-radius: 0 8px 8px 0;

  position: absolute;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    width: 4px;
    height: 46px;
    border-radius: 8px 0px 0px 8px;

    position: absolute;
    left: 0;
    top: 0;
  }
`;

export const VacancyContainer = styled.div`
  position: relative;
  transition: 0.2s;
  border-radius: 8px;

  &:hover {
    box-shadow: ${Depth4};
  }

  .action-button {
    position: absolute;
    bottom: 22px;
    right: 26px;

    width: 48px;
    height: 48px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${BackgroundColor};
    border: 1px solid ${OutlineColor};
    border-radius: 50%;
    transition: 0.2s;

    &:hover {
      background: rgba(220, 220, 220, 0.2);
    }
  }

  .action-button + .action-button {
    right: 100px;
  }
`;

export const Vacancy = styled.button`
  min-width: 608px;
  height: 212px;
  padding: 22px 26px 20px 42px;
  background: ${BackgroundColor};

  border: 1px solid ${OutlineColor};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  position: relative;
  gap: 16px;

  .vacancy-name {
    ${Bold18Styles}
    color: ${HighEmphasis};
  }

  .vacancy-location {
    ${Regular14Styles}
    color: ${MediumEmphasis};
  }

  &:after {
    content: '';
    position: absolute;
    border-radius: 2px;
    left: 18px;
    top: 12px;

    width: 4px;
    height: 188px;
  }
`;

export const VacanciesContainer = styled.section<VacanciesContainerProps>`
  display: flex;
  gap: 30px;
  flex-flow: wrap;

  position: relative;
  padding: 78px 0;

  ${({ colors: { low, high } }) => css`
    ${VacanciesContainerStatus} {
      background: ${low};
      color: ${high};

      &:after {
        background: ${high};
      }
    }

    ${Vacancy}:after {
      background: ${high};
    }
  `}
`;

export const VacancyAspects = styled.div`
  ${Regular14Styles}

  display: flex;
  gap: 40px;
  color: ${MediumEmphasis};
  font-size: 14px;

  p + p {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: ${MediumEmphasis};
      left: -20px;
      bottom: 38%;
    }
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  margin-top: 24px;
`;

export const VacancyCurrentSituation = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`;

export const SituationContainer = styled.div`
  ${Medium14Styles}
  line-height: 24px;
  color: ${HighEmphasis};

  display: flex;
  padding: 12px 24px;
  gap: 8px;
  border: 1px solid ${OutlineColor};
  border-radius: 48px;
`;

export const NoVacanciesContainer = styled.div`
  width: 100%;
  padding-top: 6%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  p {
    ${Regular14Styles}
    line-height: 24px;

    width: 321px;
    margin-top: 20px;
    text-align: center;
    color: ${MediumEmphasis};
  }
`;
