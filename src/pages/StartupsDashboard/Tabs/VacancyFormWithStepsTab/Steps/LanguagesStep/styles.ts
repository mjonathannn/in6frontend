import {
  BackgroundColor,
  MediumEmphasis,
  PrimaryColor,
} from 'assets/colors/palette';
import { Bold14Styles, Medium16Styles } from 'assets/fonts/fontStyles';
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

export const LanguageInputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const LanguagesContainer = styled.div`
  width: 500px;
  padding-bottom: 50px;

  display: flex;
  flex-flow: wrap;
  gap: 22px;
`;

export const Language = styled.div`
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
