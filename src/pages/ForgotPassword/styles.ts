import styled from 'styled-components';
import { GrayBackground, GrayBody, PrimaryColor } from 'assets/colors/palette';

export const SectionMainContainerPage1 = styled.div`
  height: calc(100vh - 131px);
  width: 100%;
  background: ${GrayBackground};
`;

export const SectionSubContainerPage1 = styled.div`
  height: 100%;
  width: 1200px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.75px;
`;

export const Form = styled.div`
  width: 400px;
  margin-top: -60px;

  .primaryButton {
    display: block;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }
`;

export const Title = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
  color: ${GrayBody};
  font-weight: bold;
  text-align: center;
`;

export const Description = styled.div`
  font-size: 14px;
  color: ${GrayBody};
  line-height: 24px;
  text-align: center;
  margin-bottom: 30px;
`;

export const SectionMainContainerPage2 = styled.div`
  margin-bottom: 80px;
  width: 100%;
  background: ${GrayBackground};
`;

export const SectionSubContainerPage2 = styled.div`
  height: 100%;
  width: 1200px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  letter-spacing: 0.75px;

  .check {
    margin-top: 100px;
    margin-bottom: 20px;
  }
  .description {
    font-size: 14px;
    color: ${GrayBody};
    line-height: 24px;
  }
  .email {
    margin-top: 4px;
    font-size: 14px;
    color: ${PrimaryColor};
  }
  .number1,
  .number2,
  .number3 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .steps {
    font-size: 14px;
    color: ${GrayBody};
  }
  .primaryButton {
    margin-top: 40px;
  }
`;
