import styled from 'styled-components';
import {
  GrayBackground,
  GrayBody,
  MediumEmphasis,
  GrayTitleActive,
  GrayLine,
  PrimaryColor,
} from 'assets/colors/palette';

export const BannerMainContainer = styled.div`
  width: 100%;
  height: 180px;
  letter-spacing: 0.75px;
  background: ${GrayBackground};
  cursor: default;
`;

export const BannerSubContainer = styled.div`
  width: 1200px;
  padding-top: 64px;
  text-align: center;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  color: ${GrayBody};
`;

export const SectionMainContainer = styled.div`
  width: 100%;
  height: 1150px;
  background: ${GrayBackground};
  cursor: default;
`;

export const SectionSubContainer = styled.div`
  width: 1200px;
  height: 100%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

export const LoginContainer = styled.div`
  width: 400px;
  height: 400px;
  float: left;
  margin-left: 120px;
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

export const SignupContainer = styled.div`
  width: 400px;
  height: auto;
  float: right;
  margin-right: 120px;
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
  .sectionTitle {
    font-size: 24px;
    color: ${GrayTitleActive};
    margin-bottom: 20px;
  }
  .sectionTitle2 {
    font-size: 24px;
    color: ${GrayTitleActive};
    margin-top: 15px;
    margin-bottom: 20px;
    padding-top: 20px;
    border-top: solid 1px ${GrayLine};
  }
  .primaryButton {
    width: 400px;
    margin-top: 30px;
    margin-bottom: 20px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }
  .politicsAndTerms {
    font-size: 14px;
    color: ${GrayBody};
    line-height: 24px;

    p,
    button {
      float: left;
    }

    .terms,
    .politics {
      color: ${PrimaryColor};
      background: transparent;
      cursor: pointer;
      white-space: normal;
      border: 0;
      outline: 0;
      height: 24px;
      letter-spacing: 0.75px;
      font-size: 14px;
    }
    .ea {
      margin: 0px 4px;
    }
  }
`;
