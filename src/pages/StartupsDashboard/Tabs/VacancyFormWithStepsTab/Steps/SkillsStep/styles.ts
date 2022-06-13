import {
  BackgroundColor,
  HighEmphasis,
  MediumEmphasis,
  OutlineColor,
  PrimaryColor,
} from 'assets/colors/palette';
import {
  Bold14Styles,
  Medium16Styles,
  Regular14Styles,
} from 'assets/fonts/fontStyles';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 44px;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 16px;

  & > span {
    ${Bold14Styles}
    color: ${MediumEmphasis};

    text-align: start;
    width: 100%;
    margin-bottom: 40px;
  }
`;

export const SkillsContainer = styled.div`
  width: 500px;
  padding-bottom: 60px;

  display: flex;
  flex-flow: wrap;
  gap: 46px;
`;

export const SkillInputContainer = styled.div`
  width: 500px;
  height: 144px;
  padding: 16px;

  display: flex;
  flex-direction: column;

  gap: 10px;
  background: ${BackgroundColor};
  border: 1px solid ${OutlineColor};
  border-radius: 8px;
`;

export const Skill = styled.div`
  width: fit-content;
  padding: 12px 19px;
  height: 48px;
  background: ${BackgroundColor};
  border: 1px solid ${PrimaryColor};
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  span {
    ${Medium16Styles}
    color: ${PrimaryColor};
  }

  button {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    &:hover {
      transform: rotate(90deg);
    }

    img {
      width: 16px;
      height: 16px;
    }
  }
`;

export const SkillTextArea = styled.textarea`
  ${Regular14Styles}

  display: block;
  resize: initial;
  width: 100%;
  min-height: 54px;
  background: ${BackgroundColor};
  color: ${HighEmphasis};
  outline: none;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${MediumEmphasis};
    border-radius: 100px;
  }

  &::placeholder {
    color: ${OutlineColor};
  }
`;

export const SkillTextAreaDescription = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.75px;

  .input-description {
    color: ${MediumEmphasis};
  }

  .characters-counter {
    color: ${HighEmphasis};
  }
`;
