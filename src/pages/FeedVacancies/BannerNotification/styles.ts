import {
  GradientPrimary,
  GrayBackground,
  GrayBody,
} from 'assets/colors/palette';
import { PrimaryButton } from 'components/Buttons';
import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, 0.5);
  z-index: 1;

  display: flex;
  justify-content: center;
`;

export const BannerContainer = styled.div`
  position: relative;
  top: 96px;

  width: 952px;
  height: 556px;
  background: ${GrayBackground};

  border-radius: 8px;
  display: flex;
  align-items: center;

  & > div {
    margin-top: 20px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  background: transparent;
  outline: 0;
  cursor: pointer;

  right: 12px;
  top: 12px;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  .title {
    font-size: 48px;
    line-height: 64px;
    letter-spacing: 1px;
    background: ${GradientPrimary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    width: 352px;
  }
  .description {
    width: 100%;
    margin-top: 20px;
    gap: 40px;

    display: flex;
    align-items: center;

    line-height: 28px;
    letter-spacing: 0.75px;
    color: ${GrayBody};

    p {
      width: 197px;
    }
  }
`;

export const FormContainer = styled.div`
  width: 50%;
  height: 480px;

  ${PrimaryButton} {
    width: 400px;
    margin-top: 20px;
  }
`;
