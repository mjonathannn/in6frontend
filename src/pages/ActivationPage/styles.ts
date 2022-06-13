import styled from 'styled-components';
import { GrayBackground, GrayBody } from 'assets/colors/palette';

export const MainContainer = styled.div`
  height: calc(100vh - 64px);
  width: 100%;
  background: ${GrayBackground};
`;

export const SubContainer = styled.div`
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

export const Text = styled.p`
  font-size: 14px;
  color: ${GrayBody};
  margin-bottom: 50px;
`;

export const Title = styled.p`
  font-size: 24px;
  margin-bottom: 30px;
  color: ${GrayBody};
`;

export const Div = styled.div`
  text-align: center;
  width: 400px;
  margin-top: -64px;
`;
