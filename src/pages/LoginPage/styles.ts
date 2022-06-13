import styled from 'styled-components';
import {
  GrayBackground,
  GrayBody,
  MediumEmphasis,
  PrimaryColor,
} from 'assets/colors/palette';

export const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 68px);
  display: flex;
  flex-direction: column;
  background: ${GrayBackground};
  position: relative;
  gap: calc(30px + 5%);

  .center-container {
    display: flex;
    flex-direction: column;
    gap: 8vh;
  }
`;

export const BannerMainContainer = styled.div`
  width: 100%;
  letter-spacing: 0.75px;

  .subContainer {
    width: 500px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    color: ${GrayBody};
  }
`;

export const SectionMainContainer = styled.div`
  display: flex;
  justify-content: center;

  .subContainer {
    width: calc(1000px + 20%);
    display: flex;
    justify-content: space-evenly;
  }
`;

export const SignupContainer = styled.div`
  width: 400px;
  letter-spacing: 0.75px;

  .secondaryTitle {
    color: ${MediumEmphasis};
    margin-bottom: 10px;
  }
  .title {
    font-size: 32px;
    color: ${MediumEmphasis};
    font-weight: 700;
    margin-bottom: 22px;
    letter-spacing: 1px;
  }
  .description {
    font-size: 14px;
    color: ${MediumEmphasis};
    margin-bottom: 45px;
    line-height: 24px;
  }
`;

export const LoginContainer = styled.div`
  letter-spacing: 0.75px;

  .secondaryTitle {
    color: ${GrayBody};
    margin-bottom: 10px;
  }
  .title {
    font-size: 32px;
    color: ${GrayBody};
    font-weight: 700;
    margin-bottom: 22px;
    letter-spacing: 1px;
  }
  .checkbox {
    float: left;
    margin-left: -10px;
  }
  .labelKeepConected {
    float: left;
    color: ${GrayBody};
    font-size: 15px;
    margin-top: 11px;
  }
  .labelForgotPass {
    float: right;
    color: ${PrimaryColor};
    font-size: 15px;
    margin-top: 11px;
    cursor: pointer;
    background: transparent;
    letter-spacing: 0.75px;
    border: 0;
    outline: 0;
  }
  .primaryButton {
    width: 400px;
    margin-top: 30px;
  }
`;
