import styled, { css } from 'styled-components';
import {
  BackgroundColor,
  GradientPrimary,
  HighEmphasis,
  OutlineColor,
  PrimaryColor,
} from 'assets/colors/palette';
import { Depth16 } from 'assets/colors/boxShadows';
import {
  Medium14Styles,
  Medium16Styles,
  Regular14Styles,
} from 'assets/fonts/fontStyles';

interface TabButtonProps {
  isSelectedTab: boolean;
}

interface CompanyBoxProps {
  isVisible: boolean;
}

export const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  border-bottom: solid 1px ${OutlineColor};
  background: ${BackgroundColor};

  display: flex;
  justify-content: center;
  z-index: 1;
`;

export const HeaderSubContainer = styled.div`
  width: 1246px;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TabButton = styled.button<TabButtonProps>`
  ${Regular14Styles}

  background: ${HighEmphasis};
  height: 16px;

  ${({ isSelectedTab }) =>
    isSelectedTab
      ? css`
          background: ${GradientPrimary};
          font-weight: 700;
        `
      : css`
          &:hover {
            transition: 0.2s;
            background: ${PrimaryColor};
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}

  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const CompanyContainer = styled.div`
  padding-left: 14px;
  height: 48px;

  display: flex;
  align-items: center;
  gap: 14px;

  border: 1px solid ${OutlineColor};
  position: relative;
  border-radius: 100px;

  .notifications {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 32px;
    height: 32px;

    background: transparent;
    border-radius: 50%;
    transition: 0.3s;

    &:hover {
      background: rgba(220, 220, 220, 0.3);
    }
  }

  .company-data {
    margin-right: -1px;
    padding: 0px 16px;
    height: 48px;
    border: 1px solid ${OutlineColor};
    background: ${BackgroundColor};
    border-radius: 100px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    transition: 0.2s;

    &:hover {
      background: rgba(220, 220, 220, 0.2);
    }

    #company-icon {
      ${Medium16Styles}

      width: 32px;
      height: 32px;
      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${BackgroundColor};
      background: ${HighEmphasis};
    }

    #company-name {
      ${Medium14Styles}
      color: ${HighEmphasis};
    }
  }
`;

export const NavigationContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;

  button:first-child {
    margin-right: 10px;
  }
`;

export const ImageContainer = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;

  background: #f0f0f0;
  border-radius: 50%;
  transition: 0.2s;
`;

export const CompanyBox = styled.div<CompanyBoxProps>`
  position: absolute;
  top: 54px;
  left: 50%;
  margin-left: -148px;

  width: 296px;
  height: 236px;

  background-color: ${BackgroundColor};
  border: 1px solid ${OutlineColor};
  border-radius: 8px;
  padding: 20px;
  box-shadow: ${Depth16};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  z-index: 2;
  transition: 0.5s;

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

  button {
    ${Medium16Styles}
    background: transparent;
    color: ${HighEmphasis};

    display: flex;
    align-items: center;
    height: 32px;

    gap: 14px;
    transition: 0.2s;

    &:hover {
      color: ${PrimaryColor};

      ${ImageContainer} {
        background-color: #fce8e5;

        img {
          filter: invert(56%) sepia(67%) saturate(7443%) hue-rotate(1deg)
            brightness(102%) contrast(105%);
        }
      }
    }
  }
`;
