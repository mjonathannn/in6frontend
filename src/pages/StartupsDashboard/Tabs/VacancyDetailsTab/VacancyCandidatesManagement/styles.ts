import styled, { css } from 'styled-components';
import {
  GrayBackground,
  GrayBody,
  MediumEmphasis,
  GrayLine,
  GrayPlaceHolder,
  PrimaryColor,
} from 'assets/colors/palette';
import { Depth4 } from 'assets/colors/boxShadows';

interface CandidateAssessmentProps {
  background?: string;
}

interface CandidateButtonProps {
  isSelected: boolean;
}

interface AssessmentButtonProps {
  assessmentType: 'positive' | 'negative';
  active: boolean;
}

interface SearchFiltersContainerProps {
  isVisible: boolean;
}

const getAssessmentBorderAndColor = (
  assessmentType: 'positive' | 'negative',
) => {
  return assessmentType === 'positive' ? '#237B4B' : '#E00025';
};

export const CandidatesSearch = styled.div`
  width: 752px;
`;

export const SearchContainer = styled.div`
  display: flex;
  position: relative;
  gap: 12px;
  margin-bottom: 30px;
`;

export const FilterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background: ${GrayBackground};
  outline: 0;
  width: 48px;
  height: 48px;

  border: 1px solid ${GrayLine};
  border-radius: 8px;
  transition: 0.2s;

  &:active {
    border-color: ${PrimaryColor};
  }
`;

export const SearchBar = styled.div`
  width: 692px;
  height: 48px;
  background: ${GrayBackground};
  border: 1px solid ${GrayLine};
  border-radius: 8px;
  cursor: text;

  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;

  input {
    width: 92%;
    outline: 0;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.75px;
    color: ${GrayBody};

    &::placeholder {
      color: ${GrayPlaceHolder};
    }
  }
  img {
    opacity: 0.5;
    filter: invert(76%) sepia(11%) saturate(0%) hue-rotate(186deg)
      brightness(95%) contrast(87%);
  }
`;

export const SearchFiltersContainer = styled.div<SearchFiltersContainerProps>`
  position: absolute;
  top: 60px;
  right: 0;

  background: ${GrayBackground};
  padding: 10px 18px 20px;
  border: 1px solid ${GrayLine};
  border-radius: 8px;

  display: flex;
  justify-content: center;
  gap: 16px;

  box-shadow: ${Depth4};
  transition: 0.5s;
  z-index: 1;

  ${({ isVisible }) =>
    isVisible
      ? css`
          visibility: visible;
          opacity: 1;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `}

  .filter-column:not(:last-child) div {
    padding-right: 16px;
    border-right: 1px solid ${GrayLine};
  }
`;

export const ColumnNamesContainer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  margin-bottom: 12px;
  align-items: center;

  background: ${GrayBackground};
  border: 1px solid ${GrayLine};
  border-radius: 8px;

  filter: drop-shadow(0px 0.6px 1.8px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 3.2px 7.2px rgba(0, 0, 0, 0.1));

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.75px;
    color: ${GrayBody};

    &:first-child {
      margin-left: 3%;
    }

    &:not(:last-child) {
      width: 290px;
    }
  }
`;

export const Candidate = styled.div`
  width: 100%;
  height: 64px;
  position: relative;

  & + & {
    margin-top: 12.4px;
  }
`;

export const CandidateButton = styled.button<CandidateButtonProps>`
  width: 100%;
  height: 100%;

  cursor: pointer;
  background: ${GrayBackground};
  border: 1px solid
    ${({ isSelected }) => (isSelected ? PrimaryColor : GrayLine)};
  border-radius: 8px;

  display: flex;
  align-items: center;

  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.75px;
  transition: 0.2s;

  &:hover {
    border-color: ${PrimaryColor};
  }
`;

export const CandidateNameAndIcon = styled.div`
  display: flex;
  align-items: center;
  width: 290px;
  margin-left: 3%;
  gap: 12px;

  .icon {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background: ${GrayPlaceHolder};

    font-weight: 500;
    color: ${GrayBackground};

    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    color: ${GrayBody};
  }
`;

export const CandidateLocation = styled.div`
  width: 290px;
  text-align: start;
  color: ${MediumEmphasis};
`;

export const CandidateAssessment = styled.div<CandidateAssessmentProps>`
  color: ${MediumEmphasis};

  ${({ background }) =>
    background &&
    css`
      div {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 48px;
        height: 48px;
        background: ${background};
        border-radius: 48px;
      }
    `}
`;

export const SelectedCandidate = styled.div`
  width: 400px;
  height: 584px;

  background: ${GrayBackground};
  border: 1px solid ${GrayLine};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SelectedCandidateName = styled.h2`
  margin-top: 30px;
  font-weight: 400;
  font-size: 32px;
  line-height: 48px;
  letter-spacing: 1px;
  text-align: center;

  margin-bottom: 10px;
`;

export const SelectedCandidateOccupation = styled.span`
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0.75px;
  text-align: center;

  margin-bottom: 24px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-bottom: 56px;
  gap: 12px;
`;

export const WhatsappButton = styled.button`
  width: 48px;
  height: 48px;
  outline: 0;

  cursor: pointer;
  background: transparent;
  border: 1px solid ${PrimaryColor};
  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContactLine = styled.div`
  width: 336px;
  height: 50px;
  line-height: 24px;
  letter-spacing: 0.75px;
  display: flex;
  align-items: center;

  & + & {
    border-top: 1px solid ${GrayLine};
  }
`;

export const InformationName = styled.div`
  font-size: 12px;
  width: 76px;
  color: ${GrayPlaceHolder};
`;

export const CandidateInformation = styled.div`
  font-size: 14px;
  color: ${GrayBody};
`;

export const AssessmentButtonsContainer = styled.div`
  width: 336px;
  height: 61px;
  background: ${GrayBackground};
  border: 1px solid ${GrayLine};
  border-radius: 8px;
  margin-top: 44px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const AssessmentButton = styled.button<AssessmentButtonProps>`
  background: transparent;
  outline: 0;
  cursor: pointer;
  height: 44px;
  padding: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  border: 1px solid ${GrayLine};
  border-radius: 48px;

  color: ${MediumEmphasis};
  text-align: center;
  letter-spacing: 0.75px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;

  ${({ active, assessmentType }) =>
    active &&
    css`
      background: ${assessmentType === 'positive' ? '#E6F5EC' : '#FFEBEF'};
      border-color: ${getAssessmentBorderAndColor(assessmentType)};
      color: ${getAssessmentBorderAndColor(assessmentType)};
    `}
`;
