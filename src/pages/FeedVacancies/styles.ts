import styled, { css } from 'styled-components';
import {
  GradientPrimary,
  GrayBackground,
  GrayBody,
  MediumEmphasis,
  GrayLine,
  GrayPlaceHolder,
  PrimaryColor,
} from 'assets/colors/palette';
import { SecondaryButton } from 'components/Buttons';
import { Link } from 'react-router-dom';
import { Depth4 } from 'assets/colors/boxShadows';

interface VacancyJobButtonProps {
  isActivated: boolean;
}

interface SalaryFilterProps {
  barPercentage: number;
}

export const HeaderMainContainer = styled.div`
  height: 64px;
  width: 100%;
  background: ${GrayBackground};
  border-bottom: solid 1px ${GrayLine};
`;

export const HeaderSubContainer = styled.div`
  width: 1200px;
  height: 100%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  button:first-child {
    margin-top: 16px;
    margin-left: 190px;
    cursor: pointer;
    background: transparent;
    border: 0;
    outline: 0;
  }

  .secondaryButton {
    margin-top: 7px;
    float: right;
  }
`;

export const VacancyJobButton = styled(SecondaryButton)<VacancyJobButtonProps>`
  ${({ isActivated }) =>
    isActivated
      ? css`
          border-color: none;
          background-clip: content-box;
          webkit-background-clip: content-box;
          color: ${GrayBackground};
          -webkit-text-fill-color: ${GrayBackground};
          background: ${GradientPrimary};
        `
      : css`
          border-color: ${GrayLine};
          color: ${MediumEmphasis};
        `}
`;

export const VacancytypeJobsContainer = styled.div`
  width: 1185px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-evenly;
  padding: 70px 0 90px;
`;

export const SearchVacancyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  .title {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;

    h1 {
      color: ${GrayBody};
      line-height: 34px;
      letter-spacing: 1px;
    }
    p {
      color: ${MediumEmphasis};
      line-height: 28px;
      letter-spacing: 0.75px;
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  width: 924px;
  justify-content: space-evenly;
`;

export const SearchInput = styled.div`
  width: 400px;
  height: 64px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-evenly;
  border: 1px solid ${GrayLine};
  border-radius: 32px;
  cursor: text;

  & + & > img {
    filter: invert(92%) sepia(0%) saturate(1%) hue-rotate(161deg)
      brightness(81%) contrast(82%);
  }
  img {
    width: 24px;
    height: 24px;
  }
  input {
    outline: 0;
    width: 328px;
    height: 90%;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.75px;
    color: ${GrayBody};

    &::placeholder {
      color: ${GrayPlaceHolder};
    }
  }
  button {
    position: absolute;
    right: 18px;

    width: 24px;
    height: 24px;
    background: transparent;
    cursor: pointer;
    outline: 0;
  }
`;

export const SearchButton = styled.button`
  background: ${GradientPrimary};
  border: 0;
  outline: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const MainContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 80px;
  padding: 90px 0 70px;

  .container-name {
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.75px;
    font-weight: 700;
    color: ${GrayBody};
  }
`;

export const FiltersContainer = styled.section`
  width: 256px;

  display: flex;
  flex-direction: column;
  gap: 36px;
  letter-spacing: 0.75px;
  color: ${GrayBody};

  .subcontainer-name {
    line-height: 16px;
  }
`;

export const SalaryFilter = styled.div<SalaryFilterProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 8px;

  input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 100px;
    background: ${GrayLine};
    outline: none;
    margin-top: 8px;
    position: relative;
    cursor: pointer;

    &:after {
      content: '';
      width: ${({ barPercentage }) => 0.91 * barPercentage}%;
      height: 4px;
      background: ${GrayBody};
      position: absolute;
      left: 0;
    }
  }

  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    background: ${GrayBody};
    border-radius: 50%;
  }

  input::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: ${GrayBody};
    border-radius: 50%;
  }

  .value-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 24px;
    line-height: 38px;
  }
`;

export const WorkLoadFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const OtherFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const VacanciesContainer = styled.section`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ClearSearchResultsButton = styled.button`
  width: max-content;
  background: transparent;
  outline: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 10px;

  p {
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.75px;
    color: ${PrimaryColor};
  }
`;

export const Vacancy = styled(Link)`
  width: 600px;
  height: 224px;
  padding: 20px;
  cursor: pointer;
  outline: 0;

  text-decoration: none;
  background: ${GrayBackground};
  border: 1px solid ${GrayLine};
  border-radius: 8px;
  transition: 0.2s;

  display: flex;
  flex-direction: column;
  gap: 18px;

  .vacancy-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.75px;
    color: ${GrayBody};

    margin: 6px 0;
  }

  &:hover {
    box-shadow: ${Depth4};
  }

  &:active {
    border-color: ${PrimaryColor};
  }
`;

export const VacancyData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .company-data {
    letter-spacing: 0.75px;
    display: flex;
    gap: 12px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    div {
      text-align: start;

      p {
        font-size: 16px;
        line-height: 16px;
        color: ${GrayBody};
      }
      small {
        font-size: 14px;
        line-height: 24px;
        color: ${MediumEmphasis};
      }
    }
  }
  .vacancy-date {
    line-height: 20px;
    color: ${PrimaryColor};
    font-size: 16px;
  }
`;

export const VacancyAspects = styled.div`
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

export const VacancyExtraAspects = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 4px;

  i {
    width: 44px;
    height: 32px;

    border: 1px solid ${PrimaryColor};
    border-radius: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const RegisterNoticeContainer = styled.section`
  width: 256px;
  height: 384px;
  padding: 0 28px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #fce8e5;
  border-radius: 8px;

  letter-spacing: 0.75px;
  color: ${PrimaryColor};

  .title {
    font-size: 24px;
    line-height: 38px;
    margin-top: 32px;
  }

  .description {
    font-size: 14px;
    line-height: 24px;
    margin-top: 16px;
  }
`;

export const SignUpEmailButton = styled.button`
  width: 200px;
  height: 48px;
  border-radius: 48px;
  cursor: pointer;

  display: flex;
  gap: 8px;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 44px;
  outline: 0;

  background: ${GradientPrimary};
  color: ${GrayBackground};

  line-height: 16px;
  letter-spacing: 0.75px;
  font-size: 16px;
  font-weight: 500;

  img {
    width: 24px;
    height: 24px;
  }
  p,
  img {
    transition: 0.2s;
  }

  &:hover {
    p {
      font-size: 17px;
    }
    img {
      width: 26px;
      height: 26px;
    }
  }
`;
