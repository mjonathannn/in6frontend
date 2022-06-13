import styled from 'styled-components';
import { GrayBackground, GrayBody, PrimaryColor } from 'assets/colors/palette';

export const MainContainer = styled.div`
  margin-bottom: 80px;
  margin-top: 80px;
  background: ${GrayBackground};
`;

export const SubContainer = styled.div`
  width: 400px;
  text-align: center;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  letter-spacing: 0.75px;
  cursor: default;

  .number {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .primaryButton {
    margin-top: 40px;
  }
`;

export const Title = styled.p`
  font-size: 24px;
  margin-bottom: 30px;
  color: ${GrayBody};
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 24px;
  color: ${GrayBody};
`;

export const Email = styled.p`
  margin-top: 4px;
  font-size: 14px;
  color: ${PrimaryColor};
`;

export const Steps = styled.p`
  font-size: 14px;
  color: ${GrayBody};
`;
