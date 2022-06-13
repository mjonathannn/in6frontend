import styled from 'styled-components';
import {
  GrayLine,
  GrayBackground,
  GrayBody,
  PrimaryColor,
  MediumEmphasis,
} from 'assets/colors/palette';

export const HeaderMainContainer = styled.div`
  height: 64px;
  width: 100%;
  background: ${GrayBackground};
  border-bottom: solid 1px ${GrayLine};

  .subContainer {
    height: 100%;
    width: 1200px;
    position: relative;
    margin-right: auto;
    margin-left: auto;

    img {
      margin-top: 16px;
    }
  }
  .accessContainer {
    float: right;
    height: 100%;
    width: auto;

    .simpleButton {
      float: left;
      margin-top: 8px;
      margin-left: 30px;
    }
    .primaryButton {
      float: left;
      margin-top: 7px;
      margin-left: 30px;
    }
  }
`;

export const SectionMainContainer = styled.div`
  height: 100%;
  width: 100%;
  background: ${GrayBackground};

  .subContainer {
    height: 100%;
    width: 1200px;
    position: relative;
    margin-right: auto;
    margin-left: auto;
    overflow: hidden;
  }
`;

export const Section1 = styled.div`
  height: 380px;
  width: 100%;
  padding: 60px 80px;

  .title {
    width: 502.09px;
    float: left;
    font-size: 64px;
    font-weight: 700;
    color: ${PrimaryColor};
    letter-spacing: 1px;
  }
  .description {
    width: 400px;
    margin-top: 15px;
    color: ${GrayBody};
    margin-bottom: 40px;
    letter-spacing: 0.75px;
    margin-left: 650px;
    line-height: 28px;
  }
  .secondaryButton {
    margin-left: 147px;
  }
`;

export const Section2 = styled.div`
  height: 100%;
  width: 1200px;

  img {
    margin-left: 30px;
  }
  .title {
    font-weight: 700;
    letter-spacing: 1px;
    text-align: center;
    font-size: 48px;
    color: ${GrayBody};
    margin-bottom: 50px;
  }
  .description {
    font-weight: 700;
    letter-spacing: 0.75px;
    text-align: center;
    color: ${PrimaryColor};
    margin-top: 80px;
    margin-bottom: 20px;
  }
`;

export const Section3 = styled.div`
  height: 2000px;
  width: 1200px;

  .title {
    font-weight: 700;
    letter-spacing: 1px;
    text-align: center;
    font-size: 48px;
    color: ${GrayBody};
    margin-bottom: 80px;
  }
  .description {
    font-weight: 700;
    letter-spacing: 0.75px;
    text-align: center;
    color: ${PrimaryColor};
    margin-top: 80px;
    margin-bottom: 20px;
  }

  .resource1 {
    height: 320px;

    img {
      float: left;
    }
    .resource1Title {
      position: relative;
      top: 12%;
      left: 7%;
      letter-spacing: 1px;
      font-size: 32px;
      color: ${GrayBody};
    }
    .resource1Description {
      position: relative;
      top: 20%;
      left: 7%;
      color: ${MediumEmphasis};
      letter-spacing: 0.75px;
      line-height: 28px;
    }
  }
  .resource2 {
    height: 530px;
    margin-top: 30px;

    img {
      float: right;
    }
    .resource2Title {
      position: relative;
      top: 32%;
      left: 5%;
      letter-spacing: 1px;
      font-size: 32px;
      color: ${GrayBody};
    }
    .resource2Description {
      position: relative;
      top: 36%;
      left: 5%;
      color: ${MediumEmphasis};
      letter-spacing: 0.75px;
      line-height: 28px;
    }
  }
  .resource3 {
    height: 380px;
    margin-top: 30px;

    img {
      float: left;
    }
    .resource3Title {
      position: relative;
      top: 18%;
      left: 10%;
      letter-spacing: 1px;
      font-size: 32px;
      color: ${GrayBody};
    }
    .resource3Description {
      position: relative;
      top: 24%;
      left: 10%;
      color: ${MediumEmphasis};
      letter-spacing: 0.75px;
      line-height: 28px;
    }
    .custom {
      position: relative;
      left: 28.96%;
      margin-top: -28px;
      color: ${PrimaryColor};
      font-weight: 700;
      letter-spacing: 0.75px;
    }
    .button {
      position: relative;
      top: 33%;
      left: 10%;
      color: ${PrimaryColor};
      font-size: 16px;
      font-weight: 700;
      background: ${GrayBackground};
      cursor: pointer;
      letter-spacing: 0.75px;

      img {
        float: right;
        margin-top: -2px;
        margin-left: 10px;
      }
    }
  }
  .resource4 {
    height: 300px;
    margin-top: 70px;

    img {
      float: right;
      margin-right: 50px;
    }
    .resource4Title {
      position: relative;
      top: 16%;
      left: 4%;
      letter-spacing: 1px;
      font-size: 32px;
      color: ${GrayBody};
    }
    .resource4Description {
      position: relative;
      top: 26%;
      left: 4%;
      color: ${MediumEmphasis};
      letter-spacing: 0.75px;
      line-height: 28px;
    }
  }
`;

export const CompanyFooterMainContainer = styled.div`
  height: 100%;
  width: 100%;
  background: ${GrayBackground};
  border-top: solid 1px ${GrayLine};

  .subContainer {
    width: 1200px;
    height: 300px;
    position: relative;
    margin-right: auto;
    margin-left: auto;

    .container1 {
      float: left;
      height: 100%;
      width: 400px;
      padding-top: 50px;

      .in6Logo {
        margin-bottom: 20px;
      }
      p {
        width: 290px;
        font-size: 14px;
        letter-spacing: 0.75px;
        color: ${GrayBody};
        margin-bottom: 50px;
        line-height: 24px;
      }
      .ufersaLogo {
        float: left;
      }
      .separator {
        float: left;
        height: 38px;
        width: 2px;
        background-color: ${GrayLine};
        margin-top: -5px;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
    .container2 {
      float: left;
      height: 100%;
      width: 400px;
      padding-top: 50px;
      margin-left: 50px;

      .p1 {
        font-weight: 700;
        letter-spacing: 0.75px;
        color: ${GrayBody};
        margin-bottom: 10px;
      }
      .p2 {
        font-weight: 400;
        letter-spacing: 0.75px;
        color: ${MediumEmphasis};
        font-size: 14px;
        margin-bottom: 25px;
      }
      .p3 {
        font-weight: 400;
        letter-spacing: 0.75px;
        color: ${MediumEmphasis};
        margin-bottom: 10px;
      }
      .p4 {
        color: ${GrayBody};
        letter-spacing: 0.75px;
        margin-bottom: 25px;
      }
      .p5 {
        font-weight: 400;
        letter-spacing: 0.75px;
        color: ${MediumEmphasis};
        margin-bottom: 10px;
      }
      .p6 {
        color: ${GrayBody};
        letter-spacing: 0.75px;
        margin-bottom: 25px;
      }
    }
    .container3 {
      float: right;
      height: 100%;
      width: 300px;
      padding-top: 50px;
      padding-left: 70px;

      a {
        margin-right: 20px;
        cursor: pointer;
      }
      button {
        margin-top: 130px;
        margin-left: 20px;
      }
    }
  }
`;
