import {
  BackgroundColor,
  GradientPrimary,
  HighEmphasis,
  MediumEmphasis,
  OutlineColor,
} from 'assets/colors/palette';
import { Bold18Styles, Regular14Styles } from 'assets/fonts/fontStyles';
import styled, { css } from 'styled-components';

interface AccessButtonProps {
  isOfSelectedTab: boolean;
}

export const Header = styled.header`
  width: 100%;
  height: 64px;
  background: ${BackgroundColor};

  z-index: 2;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 1246px;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const AccessContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const AccessButton = styled.button<AccessButtonProps>`
  ${Regular14Styles}
  background: transparent;
  position: relative;
  padding: 25px 6px;

  ${({ isOfSelectedTab }) =>
    isOfSelectedTab
      ? css`
          color: ${HighEmphasis};
          font-weight: 700;

          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;

            width: 100%;
            height: 2px;
            background: ${GradientPrimary};
          }
        `
      : css`
          color: ${MediumEmphasis};
        `}
`;

export const VacancyName = styled.h2`
  ${Bold18Styles}
  color: ${HighEmphasis};

  margin-right: 20px;
  max-width: 500px;
`;

export const VacancyActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;

  width: 248px;
  height: 32px;
  border-left: 1px solid ${OutlineColor};

  .action-button {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;
    border-radius: 50%;
    transition: 0.2s;

    &:hover {
      background: rgba(220, 220, 220, 0.2);
    }
  }
`;

export const SelectedSubtabContainer = styled.div`
  width: 1246px;
  margin-inline: auto;
  padding-top: 60px;
  padding-bottom: 50px;

  display: flex;
  justify-content: space-between;
  position: relative;
`;
