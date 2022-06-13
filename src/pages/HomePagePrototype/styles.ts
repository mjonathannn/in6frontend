import styled from 'styled-components';
import {
  GrayLine,
  GrayBackground,
  GrayBody,
  PrimaryColor,
  MediumEmphasis,
  colorStatusItemSecondary,
  GradientPrimary,
} from 'assets/colors/palette';
import { Medium16Styles } from 'assets/fonts/fontStyles';

interface RedirectButtonProps {
  isActive: boolean;
}

export const RedirectButton = styled.a<RedirectButtonProps>`
  ${Medium16Styles}

  background: ${GrayBackground};
  border-radius: 5px;
  color: ${({ isActive }) => (isActive ? PrimaryColor : GrayBody)};
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    color: ${PrimaryColor};
  }
`;

export const HeaderMainContainer = styled.header`
  height: 64px;
  width: 100%;
  background: ${GrayBackground};
  border-bottom: solid 1px ${GrayLine};
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 1;

  .subContainer {
    width: 1248px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .accessContainer {
      display: flex;
      align-items: center;
      gap: 30px;

      img {
        width: 59px;
        margin-right: 10px;
      }
    }
    .primaryButton {
      font-weight: 500;
      letter-spacing: 0.75px;
      line-height: 16px;
    }
  }

  @media (max-width: 1100px) {
    border: none;
    backface-visibility: hidden;

    .subContainer {
      width: 100%;
      height: 112px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        margin-bottom: auto;
      }
      .accessContainer {
        height: 50%;

        img {
          margin: 0;
        }
        ${RedirectButton} {
          display: none;
        }
      }
      .primaryButton {
        width: 100%;
        margin: 0;
        border-radius: 0;
      }
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
    padding-top: 64px;
  }

  @media (max-width: 1100px) {
    width: 100vw;

    .subContainer {
      width: 100%;
      padding-top: 112px;
      display: flex;
      flex-direction: column;
      align-items: center;

      & > img {
        width: 98%;
      }
    }
  }
`;

export const Section1 = styled.div`
  width: 100%;
  padding: 60px 80px;
  margin-bottom: 40px;

  .title {
    width: 586px;
    float: left;
    margin-left: 19px;
    font-size: 52px;
    font-weight: 700;
    background: ${GradientPrimary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
    line-height: 80px;
  }
  .description {
    width: 370px;
    margin-top: 18px;
    color: ${GrayBody};
    margin-bottom: 40px;
    letter-spacing: 0.75px;
    margin-left: 668px;
    line-height: 28px;
  }
  .secondaryButton {
    margin-left: 65px;
  }

  @media (max-width: 1100px) {
    width: 100vw;
    padding: 0;
    padding-top: 60px;

    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      width: 92%;
      font-size: 28px;
      line-height: 36px;
      text-align: center;
      margin: 0;
    }
    .description {
      font-size: 14px;
      margin: 28px 0 0;
      text-align: center;
      width: 78%;
    }
    .secondaryButton {
      display: none;
    }
  }
`;

export const Section2 = styled.div`
  height: 100%;
  width: 100%;

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

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin: 0;
      width: 264px;

      & + img {
        margin-top: 30px;
      }
    }
    .title {
      font-size: 28px;
    }
    .description {
      width: 70%;
      font-size: 14px;
    }
  }
`;

export const Section3 = styled.div`
  width: 100%;

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
    height: 300px;
    display: flex;
    gap: 100px;

    .content {
      display: flex;
      flex-direction: column;

      p {
        margin-top: 30px;
      }
      .resource1Title {
        letter-spacing: 1px;
        font-size: 32px;
        color: ${GrayBody};
        width: 75%;
      }
      .resource1Description {
        color: ${MediumEmphasis};
        letter-spacing: 0.75px;
        line-height: 28px;
        width: 85%;
      }
    }
  }
  .resource2 {
    height: 530px;
    margin-top: 30px;

    img {
      float: right;
    }

    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 28px;
      gap: 30px;

      .resource2Title {
        letter-spacing: 1px;
        font-size: 32px;
        color: ${GrayBody};
      }
      .resource2Description {
        color: ${MediumEmphasis};
        letter-spacing: 0.75px;
        line-height: 28px;
        width: 76%;
      }
    }
  }
  .resource3 {
    height: 360px;
    margin-top: 30px;
    display: flex;
    gap: 120px;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 30px;

      .resource3Title {
        letter-spacing: 1px;
        font-size: 32px;
        color: ${GrayBody};
      }
      .resource3Description {
        color: ${MediumEmphasis};
        letter-spacing: 0.75px;
        line-height: 28px;
        width: 90%;
      }
      .custom {
        position: relative;
        background: ${GradientPrimary};
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 700;
        letter-spacing: 0.75px;
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
    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 28px;
      gap: 30px;

      .resource4Title {
        letter-spacing: 1px;
        font-size: 32px;
        color: ${GrayBody};
      }
      .resource4Description {
        color: ${MediumEmphasis};
        letter-spacing: 0.75px;
        line-height: 28px;
        width: 82%;
      }
    }
  }
  .resource5 {
    height: 320px;
    margin-top: 70px;
    display: flex;
    gap: 100px;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 30px;

      .resource5Title {
        letter-spacing: 1px;
        font-size: 32px;
        color: ${GrayBody};
        width: 50%;
      }
      .resource5Description {
        color: ${MediumEmphasis};
        letter-spacing: 0.75px;
        line-height: 28px;
        width: 82%;
      }
    }
  }

  @media (max-width: 1100px) {
    .title {
      font-size: 28px;
      margin-bottom: 50px;
    }
    .description {
      font-size: 14px;
    }
    .resource1 {
      height: auto;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      text-align: center;
      gap: 20px;

      img {
        width: 90%;
      }
      .content {
        align-items: center;

        p {
          margin-top: 0;

          & + p {
            margin-top: 20px;
          }
        }
        .resource1Title {
          font-size: 24px;
          width: 90%;
        }
        .resource1Description {
          font-size: 14px;
          width: 90%;
        }
      }
    }
    .resource2 {
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 45px;
      gap: 16px;

      img {
        width: 90%;
      }
      .content {
        margin: 0;
        align-items: center;
        gap: 20px;

        .resource2Title {
          font-size: 24px;
          width: 90%;
        }
        .resource2Description {
          font-size: 14px;
          width: 85%;
        }
      }
    }
    .resource3 {
      height: auto;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 50px;
      gap: 20px;

      img {
        width: 90%;
      }
      .content {
        align-items: center;
        gap: 20px;

        p {
          margin-top: 0;
        }
        .resource3Title {
          font-size: 24px;
          width: 90%;
        }
        .resource3Description {
          font-size: 14px;
          width: 88%;
        }
      }
    }
    .resource4 {
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 50px;
      gap: 20px;

      img {
        width: 90%;
        margin-right: auto;
      }
      .content {
        margin: 0;
        align-items: center;
        gap: 20px;

        .resource4Title {
          font-size: 24px;
          width: 100%;
        }
        .resource4Description {
          font-size: 14px;
          width: 88%;
        }
      }
    }
    .resource5 {
      height: auto;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 50px;
      gap: 20px;

      img {
        width: 90%;
      }
      .content {
        align-items: center;
        gap: 20px;

        p {
          margin-top: 0;
        }
        .resource5Title {
          font-size: 24px;
          width: 90%;
        }
        .resource5Description {
          font-size: 14px;
          width: 88%;
        }
      }
    }
  }
`;

export const Section4 = styled.div`
  height: 100%;
  margin-top: 80px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-weight: 700;
    letter-spacing: 1px;
    font-size: 48px;
    color: ${GrayBody};
    margin-top: 16px;
    line-height: 64px;
  }
  .description {
    font-weight: 700;
    letter-spacing: 0.75px;
    color: ${PrimaryColor};
    margin-top: 16px;
    margin-bottom: 60px;
    line-height: 16px;
  }
  .content {
    color: ${MediumEmphasis};
    letter-spacing: 0.75px;
    line-height: 28px;
    margin-bottom: 50px;
    width: 42%;
  }
  .custom {
    background: ${GradientPrimary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }

  @media (max-width: 1100px) {
    margin-top: 70px;

    img {
      width: 90%;

      &:first-child {
        width: 108px;
      }
    }
    .title {
      font-size: 28px;
      line-height: 34px;
    }
    .description {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 40px;
    }
    .content {
      font-size: 14px;
      width: 90%;
      margin-bottom: 36px;
    }
  }
`;

export const Section5 = styled.div`
  margin: 100px auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  div {
    width: 1040px;
    display: flex;
    justify-content: space-between;

    & + div {
      margin-top: 40px;
    }
  }
  .title {
    font-weight: 700;
    letter-spacing: 1px;
    font-size: 48px;
    color: ${GrayBody};
    margin-top: 16px;
    margin-bottom: 60px;
    line-height: 64px;
  }
  .description {
    font-weight: 700;
    letter-spacing: 0.75px;
    line-height: 16px;
    color: ${PrimaryColor};
  }

  @media (max-width: 1100px) {
    margin: 65px auto;
    width: 100vw;

    div {
      flex-direction: column;
      align-items: center;
      width: 100%;

      img {
        width: 320px;

        & + img {
          margin-top: 20px;
        }
      }
      & + div {
        margin-top: 20px;
      }
    }
    .title {
      font-size: 28px;
      line-height: 34px;
    }
    .description {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export const ReceiveUpdatesForm = styled.div`
  width: 1248px;
  height: 288px;
  background: ${colorStatusItemSecondary};

  margin: 0 auto 100px;
  border-radius: 24px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .informations {
    width: 471px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    .title {
      font-weight: 700;
      letter-spacing: 1px;
      font-size: 32px;
      color: ${GrayBody};
      line-height: 48px;
      width: 95%;
    }
    .description {
      letter-spacing: 0.75px;
      line-height: 28px;
      color: ${PrimaryColor};
    }
  }

  .form-data {
    width: 400px;

    .form-line {
      display: flex;
      justify-content: space-between;
    }
  }

  @media (max-width: 1100px) {
    width: 90%;
    height: 654px;
    flex-direction: column;
    justify-content: initial;
    margin-bottom: 60px;
    gap: 40px;

    .informations,
    .form-data {
      width: 86%;
    }

    .informations {
      .title {
        margin-top: 30px;
        width: 90%;
        font-size: 24px;
        line-height: 34px;
      }
      .description {
        font-size: 14px;
        line-height: 24px;
      }
    }
    .form-data {
      input,
      .error-message {
        width: 100%;
      }
      .form-line {
        flex-direction: column;
        gap: 20px;
        margin-bottom: 16%;
      }
    }
    .terms {
      line-height: 24px;
    }
  }
`;

export const CompanyFooterMainContainer = styled.div`
  width: 1248px;
  padding-top: 14px;
  background: ${GrayBackground};

  border-top: solid 1px ${GrayLine};
  margin-right: auto;
  margin-left: auto;

  display: flex;
  flex-direction: column;
  gap: 28px;

  .logos-line,
  .contact {
    display: flex;
    align-items: center;
  }
  .logos-line {
    width: 100%;
    height: 32px;
    justify-content: space-between;
    font-size: 14px;
    color: ${MediumEmphasis};
    letter-spacing: 0.75px;
    line-height: 16px;
    text-align: right;

    .other-logos,
    .inovativa-logo,
    .ufersa-logos {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .other-logos {
      p {
        width: 126px;
      }
      img {
        width: auto;
        height: 24px;
      }
      .ufersa-logos canvas {
        margin: 0 -6px;
        height: 38px;
        width: 1px;
        background-color: #e0e0e0;
      }
      .inovativa-logo {
        margin-left: 36px;
        line-height: 24px;

        img {
          height: 100%;
        }
        p {
          width: auto;
        }
      }
    }
  }
  .contact {
    font-size: 16px;
    color: ${MediumEmphasis};
    letter-spacing: 0.75px;
    line-height: 28px;

    p {
      margin-left: 24px;
      padding-left: 24px;
      position: relative;
      line-height: 28px;

      &:after {
        content: '';
        position: absolute;
        background-color: #e0e0e0;
        width: 1px;
        height: 38px;
        left: 0;
        bottom: -22%;
      }
    }
    .social-medias {
      height: 24px;
      a {
        cursor: pointer;
        width: 24px;
        height: 24px;

        & + a {
          margin-left: 24px;
        }
        img {
          transition: 0.2s;
        }
        &:hover {
          img {
            filter: invert(34%) sepia(98%) saturate(3313%) hue-rotate(3deg)
              brightness(105%) contrast(102%);
          }
        }
      }
    }
  }
  footer {
    border: none;
    height: auto;

    .content {
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0;
      padding-bottom: 20px;
      width: 100%;
    }
  }

  @media (max-width: 1100px) {
    width: 90vw;
    gap: 60px;

    .logos-line,
    .other-logos {
      flex-direction: column;
      justify-content: flex-start;
    }
    .logos-line {
      gap: 50px;
      height: auto;

      .other-logos {
        p {
          width: auto;
        }
        .inovativa-logo {
          margin: 0;
        }
      }
    }
    .contact {
      flex-direction: column-reverse;
      gap: 30px;

      p {
        margin: 0;
        padding: 0;

        &:after {
          width: 250px;
          height: 1px;
          left: -25%;
          bottom: -15px;
        }
      }
    }
    footer .content {
      flex-direction: column-reverse;
      text-align: center;
      gap: 20px;

      ul {
        width: 238px;
        height: auto;

        li {
          margin: 0;

          & + li:not(:last-child) {
            margin-left: 14px;
            &:after {
              left: -9px;
            }
          }
          &:last-child {
            width: 238px;
            &:after {
              content: none;
            }
          }
        }
      }
    }
  }
`;
